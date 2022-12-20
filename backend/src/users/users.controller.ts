import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.user({ id });
  }

  @Post('findByEmail')
  findOneByEmail(@Body() findEmailBody: { emailAddress: string }) {
    return this.usersService.user({ email: findEmailBody.emailAddress });
  }

  @Post('changePassword')
  changePassword(
    @Body()
    changePasswordBody: {
      userId: string;
      currentPassword: string;
      newPassword: string;
    }
  ) {
    const { userId, currentPassword, newPassword } = changePasswordBody;
    return this.usersService.changePassword(userId, currentPassword, {
      oldPassword: currentPassword,
      newPassword,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserInput) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.deleteUser({ id });
  }
}
