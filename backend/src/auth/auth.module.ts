import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { PasswordService } from './password.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { LocalStrategy } from './local.strategy';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { GoogleAuthenticationService } from './authentication/social/google-authentication.service';
import { GoogleAuthenticationController } from './authentication/social/google-authentication.controller';
import jwtConfig from 'src/common/configs/jwt.config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    PasswordService,
    UsersService,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    GoogleAuthenticationService,
  ],
  exports: [AuthService],
  controllers: [GoogleAuthenticationController],
})
export class AuthModule {}
