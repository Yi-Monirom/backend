import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewInput: CreateReviewInput, userId: number): Promise<Review> {
    const review = this.reviewRepository.create({ ...createReviewInput, userId });
    return this.reviewRepository.save(review);
  }

  async findByProduct(productId: number): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { productId },
      relations: { user: true },
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) throw new NotFoundException(`Review #${id} not found`);
    await this.reviewRepository.remove(review);
    return review;
  }
}
