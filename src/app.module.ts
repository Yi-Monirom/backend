import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { ReviewModule } from './review/review.module';
import { LookModule } from './look/look.module';
import { AuthModule } from './auth/auth.module';

import { User } from './user/entities/user.entity';
import { Product } from './product/entities/product.entity';
import { Category } from './category/entities/category.entity';
import { Order } from './order/entities/order.entity';
import { CartItem } from './order/entities/cart-item.entity';
import { Review } from './review/entities/review.entity';
import { Look } from './look/entities/look.entity';


@Module({
  imports: [

    // Load .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),


    // PostgreSQL Neon connection
    TypeOrmModule.forRoot({
      type: 'postgres',

      url: process.env.DATABASE_URL,

      ssl: {
        rejectUnauthorized: false,
      },

      extra: {
        connectionTimeoutMillis: 30000,
      },

      entities: [
        User,
        Product,
        Category,
        Order,
        CartItem,
        Review,
        Look,
      ],

      synchronize: true,
    }),


    // GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      autoSchemaFile: join(
        process.cwd(),
        'src/schema.gql'
      ),

      sortSchema: true,
    }),


    // Modules
    OrderModule,
    ProductModule,
    UserModule,
    CategoryModule,
    ReviewModule,
    LookModule,
    AuthModule,

  ],

  controllers: [
    AppController,
  ],

  providers: [
    AppService,
  ],
})
export class AppModule {}