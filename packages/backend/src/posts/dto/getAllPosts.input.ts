import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class GetAllPostsInput {
  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  limit: number;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  cursor?: string;
}
