import 'reflect-metadata';
import { ObjectType, HideField, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Post } from 'src/posts/models/post.model';
import { BaseModel } from 'src/common/models/base.model';
import { Exclude } from 'class-transformer';

@ObjectType()
export class User extends BaseModel {
  @Field()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  firstname?: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @Field(() => [Post], { nullable: true })
  posts?: [Post] | null;

  @Field({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @HideField()
  password: string;
}
