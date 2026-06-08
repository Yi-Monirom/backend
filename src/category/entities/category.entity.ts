import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@ObjectType()
@Entity('categories')
export class Category {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  imageUrl: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
