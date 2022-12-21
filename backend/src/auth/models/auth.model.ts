import { UserEntity } from 'src/users/entities/user.entity';

export class Auth {
  user: UserEntity;
  accessTokenCookie: string;
  refreshTokenCookie: string;
}
