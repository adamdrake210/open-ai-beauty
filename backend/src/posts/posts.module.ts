import { Module } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { OpenaiService } from 'src/openai/openai.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [],
  providers: [OpenaiService, CloudinaryService, PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
