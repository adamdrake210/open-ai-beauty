import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { PasswordService } from 'src/auth/password.service';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  providers: [UsersService, PasswordService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
