import {
  ConflictException,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  onModuleInit() {
    const clientId = this.configService.get('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  async authenticate(token: string) {
    try {
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: token,
      });
      const { email, sub: googleId, name, picture } = loginTicket.getPayload();
      const user = await this.usersService.findOneUserByGoogleId(googleId);
      if (user) {
        return await Promise.all([
          this.authService.getCookieWithJwtToken(user.id),
          this.authService.getCookieWithJwtRefreshToken(user.id),
          user,
        ]);
      } else {
        const newUser = await this.usersService.createUser({
          email,
          googleId,
          firstname: name,
          pictureUrl: picture,
        });
        return await Promise.all([
          this.authService.getCookieWithJwtToken(newUser.id),
          this.authService.getCookieWithJwtRefreshToken(newUser.id),
          newUser,
        ]);
      }
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw new UnauthorizedException();
    }
  }
}
