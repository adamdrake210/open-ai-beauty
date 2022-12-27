import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LoginDto } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import RequestWithUser from './interfaces/requestWithUser.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Post('register')
  async register(@Body() registrationData: SignupInput) {
    return this.authService.createUser(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    const [accessTokenCookie, refreshTokenCookie] = await Promise.all([
      this.authService.getCookieWithJwtToken(user.id),
      this.authService.getCookieWithJwtRefreshToken(user.id),
    ]);

    await this.userService.setCurrentRefreshToken(
      refreshTokenCookie.token,
      user.id
    );

    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie.cookie]);
    user.password = undefined;
    user.currentHashedRefreshToken = undefined;
    return res.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser) {
    await this.userService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    user.currentHashedRefreshToken = undefined;
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() request: RequestWithUser, @Res() res: Response) {
    const accessTokenCookie = await this.authService.getCookieWithJwtToken(
      request.user.id
    );

    res.setHeader('Set-Cookie', accessTokenCookie);
    const user = request.user;
    user.password = undefined;
    user.currentHashedRefreshToken = undefined;
    return res.send(user);
  }
}
