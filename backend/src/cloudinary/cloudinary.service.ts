import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadCloudinaryImage(imageUrl: string) {
    const cloudinaryResponse = await v2.uploader.upload(imageUrl, {
      folder: 'openai-beauty',
      format: 'jpg',
      transformation: [
        {
          width: 500,
          height: 500,
          gravity: 'face',
          crop: 'fill',
        },
      ],
    });

    return cloudinaryResponse.secure_url;
  }
}
