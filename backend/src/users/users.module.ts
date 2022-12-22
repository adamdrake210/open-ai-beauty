import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { PasswordService } from 'src/auth/password.service';
import { UsersController } from './users.controller';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { BcryptService } from 'src/auth/hashing/bcrypt.service';

@Module({
  imports: [],
  providers: [
    UsersService,
    PasswordService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
