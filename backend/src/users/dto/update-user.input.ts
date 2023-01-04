import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserInput {
  @ApiProperty({ nullable: true })
  firstname?: string;
  @ApiProperty({ nullable: true })
  lastname?: string;
  @ApiProperty({ nullable: true })
  currentHashedRefreshToken?: string;
}
