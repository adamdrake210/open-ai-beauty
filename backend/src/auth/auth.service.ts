import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { SignupInput } from './dto/signup.input';
import { Token } from './models/token.model';
import { SecurityConfig } from 'src/common/configs/config.interface';
import { TokenPayload } from './tokenPayload.interface';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService
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
        throw new ConflictException(`Email ${payload.email} already used.`);
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
    const isPasswordMatching = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  // async login(
  //   email: string,
  //   password: string
  // ): Promise<Token & { user: User }> {
  //   const user = await this.prisma.user.findUnique({ where: { email } });

  //   if (!user) {
  //     throw new NotFoundException(`No user found for email: ${email}`);
  //   }

  //   const passwordValid = await this.passwordService.validatePassword(
  //     password,
  //     user.password
  //   );

  //   if (!passwordValid) {
  //     throw new BadRequestException('Invalid password');
  //   }

  //   const { accessTokenCookie, refreshTokenCookie } = this.generateTokens({
  //     userId: user.id,
  //   });

  //   return {
  //     accessTokenCookie,
  //     refreshTokenCookie,
  //     user,
  //   };
  // }

  // validateUser(userId: string): Promise<User> {
  //   return this.prisma.user.findUnique({ where: { id: userId } });
  // }

  getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['userId'];
    return this.prisma.user.findUnique({ where: { id } });
  }

  generateTokens(payload: { userId: string }): Token {
    return {
      accessTokenCookie: this.getCookieWithJwtToken(payload.userId),
      refreshTokenCookie: this.getCookieWithJwtRefreshToken(payload.userId),
    };
  }

  // private generateAccessToken(payload: { userId: string }): string {
  //   return this.jwtService.sign(payload);
  // }

  // private generateRefreshToken(payload: { userId: string }): string {
  //   const securityConfig = this.configService.get<SecurityConfig>('security');
  //   return this.jwtService.sign(payload, {
  //     secret: this.configService.get('JWT_REFRESH_SECRET'),
  //     expiresIn: securityConfig.refreshIn,
  //   });
  // }

  // private refreshToken(token: string) {
  //   try {
  //     const { userId } = this.jwtService.verify(token, {
  //       secret: this.configService.get('JWT_REFRESH_SECRET'),
  //     });

  //     return this.generateTokens({
  //       userId,
  //     });
  //   } catch (e) {
  //     throw new UnauthorizedException();
  //   }
  // }

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME'
      )}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME'
    )}`;
  }

  public getCookieWithJwtRefreshToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME'
      )}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME'
    )}`;
    return {
      cookie,
      token,
    };
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
