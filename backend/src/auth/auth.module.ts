import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from './password.service';
// import { GqlAuthGuard } from './gql-auth.guard';
import { AuthService } from './auth.service';
// import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
// import { SecurityConfig } from 'src/common/configs/config.interface';
import { UsersService } from 'src/users/users.service';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token-strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        // const securityConfig = configService.get<SecurityConfig>('security');
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
    // GqlAuthGuard,
    PasswordService,
    UsersService,
    JwtStrategy,
    JwtRefreshTokenStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
