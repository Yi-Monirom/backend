import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../order/entities/order.entity';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatarUrl?: string;

  @Column()
  password: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'varchar' })
  resetToken?: string | null;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true, type: 'timestamp' })
  resetTokenExpiry?: Date | null;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
