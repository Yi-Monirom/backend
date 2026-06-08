import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field()
  imageUrl: string;

  @Field(() => Int)
  categoryId: number;

  @Field(() => [String], { nullable: true })
  sizes?: string[];

  @Field(() => [String], { nullable: true })
  colors?: string[];

  @Field({ nullable: true })
  fit?: string;

  @Field({ nullable: true })
  isNew?: boolean;
}
