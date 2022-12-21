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
import { ChangePasswordInput } from './dto/change-password.input';
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
    changePasswordBody: ChangePasswordInput
  ) {
    return this.usersService.changePassword(changePasswordBody);
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
