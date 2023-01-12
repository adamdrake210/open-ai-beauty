import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import {
  Injectable,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { SignupInput } from './dto/signup.input';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { UsersService } from 'src/users/users.service';
import { HashingService } from './hashing/hashing.service';
import jwtConfig from 'src/common/configs/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly hashingService: HashingService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}

  async createUser(payload: SignupInput): Promise<User> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    );

    try {
      const createdUser = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
        },
      });

      createdUser.password = undefined;
      createdUser.currentHashedRefreshToken = undefined;
      return createdUser;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email is ${payload.email} already used.`);
      }
      throw new Error(e);
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findOneUserByEmailWPassword(email);
      await this.verifyPassword(password, user.password);
      if (user) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    const isPasswordMatching = await this.hashingService.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      }
    );
  }

  public async getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const accessToken = await this.signToken(
      userId,
      this.jwtConfiguration.accessTokenTtl,
      payload
    );
    console.log(
      '🚀 ~ file: auth.service.ts:114 ~ AuthService ~ getCookieWithJwtToken ~ accessToken',
      accessToken
    );
    return `Authentication=${accessToken};Path=/;HttpOnly;Secure;SameSite=None; Expires=${this.jwtConfiguration.accessTokenTtl}`;
  }

  public async getCookieWithJwtRefreshToken(userId: string) {
    const payload: TokenPayload = { userId };
    const refreshToken = await this.signToken(
      userId,
      this.jwtConfiguration.refreshTokenTtl,
      payload
    );
    const cookie = `Refresh=${refreshToken};Path=/;HttpOnly;Secure;SameSite=None; Expires=${this.jwtConfiguration.refreshTokenTtl}`;
    return {
      cookie,
      token: refreshToken,
    };
  }

  public getCookieForLogOut() {
    return `Authentication=;Path=/;HttpOnly;Secure;SameSite=None; Expires=0`;
  }

  public getCookiesForLogOut() {
    return [
      'Authentication=;Path=/;HttpOnly;Secure;SameSite=None; Expires=0',
      'Refresh=;Path=/;HttpOnly;Secure;SameSite=None; Max-Age=0',
    ];
  }
}
