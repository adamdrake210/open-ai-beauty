import { ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';
// import { User } from 'src/users/models/user.model';
import { Token } from './token.model';

@ObjectType()
export class Auth extends Token {
  user: UserEntity;
}
