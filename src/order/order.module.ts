import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { Order } from './entities/order.entity';
import { CartItem } from './entities/cart-item.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, CartItem]), ProductModule],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
