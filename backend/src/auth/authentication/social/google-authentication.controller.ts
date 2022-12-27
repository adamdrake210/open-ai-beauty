import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { GoogleTokenDto } from '../../dto/google-token.dto';
import { GoogleAuthenticationService } from './google-authentication.service';

@Controller('authentication/google')
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthService: GoogleAuthenticationService,
    private readonly userService: UsersService
  ) {}

  @Post()
  async authenticate(@Body() tokenDto: GoogleTokenDto, @Res() res: Response) {
    const [accessTokenCookie, refreshTokenCookie, user] =
      await this.googleAuthService.authenticate(tokenDto.token);

    await this.userService.setCurrentRefreshToken(
      refreshTokenCookie.token,
      user.id
    );

    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie.cookie]);
    user.password = undefined;
    user.currentHashedRefreshToken = undefined;
    return res.send(user);
  }
}
