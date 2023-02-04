import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordInput {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  currentPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
