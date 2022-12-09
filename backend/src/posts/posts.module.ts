import { Module } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { OpenaiService } from 'src/openai/openai.service';
import { PostsResolver } from './posts.resolver';

@Module({
  imports: [],
  providers: [PostsResolver, OpenaiService, CloudinaryService],
})
export class PostsModule {}
