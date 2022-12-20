import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';
import { Token } from './models/token.model';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { User } from 'src/users/models/user.model';
import { Res } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly auth: AuthService,
    private readonly userService: UsersService
  ) {}

  @Mutation(() => Auth)
  async signup(@Args('data') data: SignupInput) {
    data.email = data.email.toLowerCase();
    const { accessTokenCookie, refreshTokenCookie } =
      await this.auth.createUser(data);
    return {
      accessTokenCookie,
      refreshTokenCookie,
    };
  }

  @Mutation(() => Auth)
  async login(@Args('data') { email, password }: LoginInput, @Res() res) {
    console.log('🚀 ~ file: auth.resolver.ts:42 ~ AuthResolver ~ res', res);
    const { accessTokenCookie, refreshTokenCookie, user } =
      await this.auth.login(email.toLowerCase(), password);

    await this.userService.setCurrentRefreshToken(
      refreshTokenCookie.token,
      user.id
    );

    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie.cookie]);
    user.password = undefined;
    user.currentHashedRefreshToken = undefined;

    return res.send(user);
  }

  // @Mutation(() => Token)
  // async refreshToken(@Args() { token }: RefreshTokenInput) {
  //   return this.auth.refreshToken(token);
  // }

  // @ResolveField('user', () => User)
  // async user(@Parent() auth: Auth) {
  //   return await this.auth.getUserFromToken(auth.accessToken);
  // }
}
