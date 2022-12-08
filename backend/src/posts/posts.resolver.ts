import { PrismaService } from 'nestjs-prisma';
import { Resolver, Query, Args, Subscription, Mutation } from '@nestjs/graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { PostIdArgs } from './args/post-id.args';
import { Post } from './models/post.model';
import { PostConnection } from './models/post-connection.model';
import { PostOrder } from './dto/post-order.input';
import { CreatePostInput } from './dto/createPost.input';
import {
  determineImageGenre,
  determinePoemStyle,
  determinePoetInspiration,
} from './utils/generatingVariables';
import { OpenaiService } from 'src/openai/openai.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

const pubSub = new PubSub();

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private prisma: PrismaService,
    private readonly openaiService: OpenaiService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Subscription(() => Post)
  postCreated() {
    return pubSub.asyncIterator('postCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post)
  async createPost(@Args('data') data: CreatePostInput) {
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

    const newPost = this.prisma.post.create({
      data: {
        title: title || 'Untitled',
        content: content || 'No content',
        author: author || 'Anonymous',
        imageUrl: cloudinaryImageUrl,
        poemRequest,
        poetInspiration,
        poemStyle,
        published: true,
      },
    });
    pubSub.publish('postCreated', { postCreated: newPost });
    return newPost;
  }

  @Query(() => PostConnection)
  async publishedPosts(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => PostOrder,
      nullable: true,
    })
    orderBy: PostOrder
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.post.findMany({
          where: {
            published: true,
            title: { contains: query || '' },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () =>
        this.prisma.post.count({
          where: {
            published: true,
            title: { contains: query || '' },
          },
        }),
      { first, last, before, after }
    );
    return a;
  }

  @Query(() => Post)
  async post(@Args() id: PostIdArgs) {
    return this.prisma.post.findUnique({ where: { id: id.postId } });
  }

  // @ResolveField('author', () => User)
  // async author(@Parent() post: Post) {
  //   return this.prisma.post.findUnique({ where: { id: post.id } }).author();
  // }
}
