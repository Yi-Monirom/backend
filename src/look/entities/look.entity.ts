import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity('looks')
export class Look {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  subtitle: string;

  @Field()
  @Column()
  image: string;

  @Field()
  @Column()
  tag: string;

  @Field(() => Float)
  @Column({ type: 'float', default: 400 })
  height: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  productId?: number;
}
