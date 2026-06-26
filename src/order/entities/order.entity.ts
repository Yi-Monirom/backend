import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { CartItem } from './cart-item.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
@Entity('orders')
export class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [CartItem])
  @OneToMany(() => CartItem, (cartItem) => cartItem.order, { cascade: true })
  items: CartItem[];

  @Field(() => Float)
  @Column({ type: 'float' })
  total: number;

  @Field()
  @Column({ default: 'pending' })
  status: string;

  @Field()
  @Column()
  address: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  cancelReason?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  returnReason?: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Int)
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;
}
