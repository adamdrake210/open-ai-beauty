import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Post extends BaseModel {
  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  content?: string | null;

  @Field(() => Boolean)
  published: boolean;

  @Field()
  author: string;

  @Field()
  imageUrl: string;

  @Field()
  poemRequest: string;

  @Field()
  poetInspiration: string;

  @Field()
  poemStyle: string;

  @Field(() => Number, { defaultValue: 0 })
  likeCount: number;
}
