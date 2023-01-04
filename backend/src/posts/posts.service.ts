import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { OpenaiService } from 'src/openai/openai.service';
import { CreatePostInput } from './dto/createPost.input';
import { GetAllPostsInput } from './dto/getAllPosts.input';
import {
  determineImageGenre,
  determinePoemStyle,
  determinePoetInspiration,
} from './utils/generatingVariables';

const defaultPoemRequestSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  title: true,
  content: true,
  imageUrl: true,
  published: true,
  author: true,
  poetInspiration: true,
  poemRequest: true,
  poemStyle: true,
  createdAt: true,
  updatedAt: true,
  likeCount: true,
});

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private readonly openaiService: OpenaiService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async createPost(data: CreatePostInput) {
    const poet = determinePoetInspiration();
    const poemStyle = determinePoemStyle();

    const preamble = `Create a new poem that is in the style of ${poet}. The number of syllables for each line of verse will be 9. The poem will be a ${poemStyle}. The poem will be about the following topic: `;

    const title = await this.openaiService.create(
      `Create a unique poem title about ${data.subject}.`
    );

    const author = await this.openaiService.create(
      `Write a first name and last name`
    );

    const content = await this.openaiService.create(
      `${preamble} ${data.subject}`
    );

    const imageUrl = await this.openaiService.createImage(
      `${content?.substring(0, 50)}, ${determineImageGenre()}`
    );

    // Posting image to cloudinary
    let cloudinaryImageUrl = '';
    if (imageUrl) {
      cloudinaryImageUrl = await this.cloudinaryService.uploadCloudinaryImage(
        imageUrl
      );
    }

    const poemRequest = `${preamble} ${data.subject}`;
    const poetInspiration = poet;

    return this.prisma.post.create({
      data: {
        title: title || 'Untitled',
        content: content || 'No content',
        author: author || 'Anonymous',
        imageUrl: cloudinaryImageUrl || imageUrl,
        poemRequest,
        poetInspiration,
        poemStyle,
        published: true,
      },
    });
  }

  async getPost(postWhereUniqueInput: Prisma.PostWhereUniqueInput) {
    return this.prisma.post.findUnique({
      where: { id: postWhereUniqueInput.id },
    });
  }

  async getAllPublishedPosts(input: GetAllPostsInput) {
    const limit = Number(input.limit) ?? 50;
    const { cursor } = input;

    const items = await this.prisma.post.findMany({
      select: defaultPoemRequestSelect,
      // get an extra item at the end which we'll use as next cursor
      take: limit + 1,
      where: {
        published: true,
      },
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if (items.length > limit) {
      // Remove the last item and use it as next cursor

      const nextItem = items.pop();
      nextCursor = nextItem.id;
    }

    return {
      items,
      nextCursor,
    };
  }
}
