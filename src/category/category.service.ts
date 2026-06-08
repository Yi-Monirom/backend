import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryInput);
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async remove(id: number): Promise<Category> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
    return category;
  }
}
