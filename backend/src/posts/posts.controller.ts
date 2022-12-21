import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostInput } from './dto/createPost.input';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPost(@Body() data: CreatePostInput) {
    return this.postsService.createPost(data);
  }

  @Get('list')
  async getAllPublishedPosts(
    @Query('limit') limit: number,
    @Query('cursor') cursor?: string
  ) {
    return this.postsService.getAllPublishedPosts({ limit, cursor });
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postsService.getPost({ id });
  }
}
