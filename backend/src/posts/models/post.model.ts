import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from 'src/common/models/base.model';

export class Post extends BaseModel {
  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  content?: string | null;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  author: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  poemRequest: string;

  @ApiProperty()
  poetInspiration: string;

  @ApiProperty()
  poemStyle: string;

  @ApiProperty({ default: 0 })
  likeCount: number;
}
