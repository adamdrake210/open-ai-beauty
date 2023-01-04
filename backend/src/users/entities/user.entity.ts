// src/articles/entities/article.entity.ts

import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty()
  email: string;

  @ApiProperty({ required: false, nullable: true })
  password: string | null;

  @ApiProperty()
  currentHashedRefreshToken: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  id: string;

  @ApiProperty({ required: false, nullable: true })
  googleId: string | null;

  @ApiProperty({ required: false, nullable: true })
  pictureUrl: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
