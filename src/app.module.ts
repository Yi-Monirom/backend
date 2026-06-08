import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { Product } from './product/entities/product.entity';
import { Category } from './category/entities/category.entity';
import { Order } from './order/entities/order.entity';
import { CartItem } from './order/entities/cart-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST ?? 'db',
      port: Number(process.env.DATABASE_PORT) ?? 5432,
      username: process.env.DATABASE_USER ?? 'MONOGRAPH',
      password: process.env.DATABASE_PASSWORD ?? 'monograph!@#123',
      database: process.env.DATABASE_NAME ?? 'Monograph_db',
      entities: [User, Product, Category, Order, CartItem],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    OrderModule,
    ProductModule,
    UserModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
