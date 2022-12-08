import { Module } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
import { PostsResolver } from './posts.resolver';

@Module({
  imports: [],
  providers: [PostsResolver, OpenaiService],
})
export class PostsModule {}
