import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import RequestWithUser from 'src/auth/interfaces/requestWithUser.interface';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Favorites added to user object for now. Array of slugs from posts.
  @Post('favorites')
  async addFavorite(
    @Req() request: RequestWithUser,
    @Body() addFavoriteBody: { slug: string }
  ) {
    const { slug } = addFavoriteBody;
    const userId = request.user.id;

    return this.usersService.addFavorite(userId, slug);
  }

  @Patch('favorites')
  async removeFavorite(
    @Req() request: RequestWithUser,
    @Body() removeFavoriteBody: { slug: string }
  ) {
    const { slug } = removeFavoriteBody;
    const userId = request.user.id;

    return this.usersService.removeFavorite(userId, slug);
  }

  // Users
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
  async delete(@Param('id') id: string, @Res() res: Response) {
    const deleteMessage = await this.usersService.deleteUser({ id });
    res.header('Set-Cookie', [
      `Refresh=; path=/; ${
        process.env.NODE_ENV === 'production'
          ? `Domain=${process.env.DOMAIN};`
          : ''
      } expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      `Authentication=; path=/; ${
        process.env.NODE_ENV === 'production'
          ? `Domain=${process.env.DOMAIN};`
          : ''
      } expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    ]);
    return res.send({ message: deleteMessage });
  }
}
