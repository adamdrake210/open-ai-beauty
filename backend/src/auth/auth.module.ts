import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from './password.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token-strategy';
import { LocalStrategy } from './local.strategy';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          signOptions: {
            expiresIn: `${configService.get(
              'JWT_ACCESS_TOKEN_EXPIRATION_TIME'
            )}s`,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    PasswordService,
    UsersService,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
