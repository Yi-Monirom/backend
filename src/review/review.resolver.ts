import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => Review)
  @UseGuards(GqlAuthGuard)
  createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
    @Context() context: any,
  ) {
    return this.reviewService.create(createReviewInput, context.req.user.id);
  }

  @Query(() => [Review], { name: 'reviews' })
  findByProduct(@Args('productId', { type: () => Int }) productId: number) {
    return this.reviewService.findByProduct(productId);
  }

  @Mutation(() => Review)
  removeReview(@Args('id', { type: () => Int }) id: number) {
    return this.reviewService.remove(id);
  }
}
