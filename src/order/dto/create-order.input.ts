import { InputType, Field, Float } from '@nestjs/graphql';
import { CartItemInput } from './cart-item.input';

@InputType()
export class CreateOrderInput {
  @Field(() => [CartItemInput])
  items: CartItemInput[];

  @Field(() => Float)
  total: number;

  @Field()
  address: string;

  @Field(() => Float, { nullable: true })
  userId?: number;
}
