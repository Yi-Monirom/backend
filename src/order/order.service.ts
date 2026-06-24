import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly productService: ProductService,
  ) {}

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const items = await Promise.all(
      createOrderInput.items.map(async (item) => {
        const product = await this.productService.findOne(item.productId);
        return {
          product,
          productId: item.productId,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          quantity: item.quantity,
        };
      }),
    );

    const order = this.orderRepository.create({
      items,
      total: createOrderInput.total,
      address: createOrderInput.address,
      userId: createOrderInput.userId ?? 0,
    });

    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: { items: { product: true } } });
  }

  async findByUser(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { userId },
      relations: { items: { product: true } },
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { items: { product: true } },
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderInput: UpdateOrderInput): Promise<Order> {
    const order = await this.findOne(id);
    if (updateOrderInput.total !== undefined) order.total = updateOrderInput.total;
    if (updateOrderInput.address !== undefined) order.address = updateOrderInput.address;
    if (updateOrderInput.items !== undefined) {
      order.items = await Promise.all(
        updateOrderInput.items.map(async (item) => {
          const product = await this.productService.findOne(item.productId);
          return {
            product,
            productId: item.productId,
            selectedSize: item.selectedSize,
            selectedColor: item.selectedColor,
            quantity: item.quantity,
          } as any;
        }),
      );
    }
    return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<Order> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
    return order;
  }

  async cancelOrder(id: number, reason: string): Promise<Order> {
    const order = await this.findOne(id);
    order.status = 'cancelled';
    order.cancelReason = reason;
    return this.orderRepository.save(order);
  }

  async returnOrder(id: number, reason: string): Promise<Order> {
    const order = await this.findOne(id);
    order.status = 'returned';
    order.returnReason = reason;
    return this.orderRepository.save(order);
  }
}
