import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CartItemInput {
  @Field(() => Int)
  productId: number;

  @Field()
  selectedSize: string;

  @Field()
  selectedColor: string;

  @Field(() => Int)
  quantity: number;
}
