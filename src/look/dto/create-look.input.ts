import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateLookInput {
  @Field()
  title: string;

  @Field()
  subtitle: string;

  @Field()
  image: string;

  @Field()
  tag: string;

  @Field(() => Float, { defaultValue: 400 })
  height: number;

  @Field(() => Int, { nullable: true })
  productId?: number;
}
