import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@ObjectType()
@Entity('products')
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Float)
  @Column({ type: 'float' })
  price: number;

  @Field()
  @Column()
  imageUrl: string;

  @Field(() => Int)
  @Column()
  categoryId: number;

  @Field(() => [String], { defaultValue: [] })
  @Column('text', { array: true, default: [] })
  sizes: string[];

  @Field(() => [String], { defaultValue: [] })
  @Column('text', { array: true, default: [] })
  colors: string[];

  @Field({ defaultValue: 'Regular' })
  @Column({ default: 'Regular' })
  fit: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  isNew: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
