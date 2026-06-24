import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field(() => Int)
  productId: number;

  @Field(() => Float)
  rating: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  comment?: string;
}
