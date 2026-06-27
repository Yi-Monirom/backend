import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LookService } from './look.service';
import { Look } from './entities/look.entity';
import { CreateLookInput } from './dto/create-look.input';

@Resolver(() => Look)
export class LookResolver {
  constructor(private readonly lookService: LookService) {}

  @Mutation(() => Look)
  createLook(@Args('createLookInput') createLookInput: CreateLookInput) {
    return this.lookService.create(createLookInput);
  }

  @Query(() => [Look], { name: 'looks' })
  findAll() {
    return this.lookService.findAll();
  }

  @Query(() => Look, { name: 'look' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.lookService.findOne(id);
  }

  @Mutation(() => Look)
  removeLook(@Args('id', { type: () => Int }) id: number) {
    return this.lookService.remove(id);
  }
}
