import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'orders' })
  findAll(
    @Args('userId', { type: () => Int, nullable: true }) userId?: number,
  ) {
    if (userId) {
      return this.orderService.findByUser(userId);
    }
    return this.orderService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.findOne(id);
  }

  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.orderService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => Order)
  removeOrder(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.remove(id);
  }

  @Mutation(() => Order)
  cancelOrder(
    @Args('id', { type: () => Int }) id: number,
    @Args('reason') reason: string,
  ) {
    return this.orderService.cancelOrder(id, reason);
  }

  @Mutation(() => Order)
  returnOrder(
    @Args('id', { type: () => Int }) id: number,
    @Args('reason') reason: string,
  ) {
    return this.orderService.returnOrder(id, reason);
  }
}
