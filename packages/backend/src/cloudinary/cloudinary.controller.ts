import { Controller, Post, Body } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  create(@Body() { imageUrl }: { imageUrl: string }) {
    return this.cloudinaryService.uploadCloudinaryImage(imageUrl);
  }
}
