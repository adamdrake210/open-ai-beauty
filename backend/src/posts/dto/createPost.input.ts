import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostInput {
  @ApiProperty()
  @IsNotEmpty()
  subject: string;
}
