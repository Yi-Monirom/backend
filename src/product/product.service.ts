import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const product = this.productRepository.create(createProductInput);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async findByCategory(categoryId: number): Promise<Product[]> {
    return this.productRepository.find({ where: { categoryId } });
  }

  async findNewArrivals(): Promise<Product[]> {
    return this.productRepository.find({ where: { isNew: true } });
  }

  async search(query: string): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .where('LOWER(product.name) LIKE LOWER(:query)', { query: `%${query}%` })
      .orWhere('LOWER(product.description) LIKE LOWER(:query)', {
        query: `%${query}%`,
      })
      .getMany();
  }

  async filter(
    sizes?: string[],
    color?: string,
    fit?: string,
  ): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder('product');

    if (sizes && sizes.length > 0) {
      query.andWhere('product.sizes && :sizes', { sizes });
    }
    if (color) {
      query.andWhere(':color = ANY(product.colors)', { color });
    }
    if (fit) {
      query.andWhere('product.fit = :fit', { fit });
    }

    return query.getMany();
  }

  async update(
    id: number,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const product = await this.findOne(id);
    if (updateProductInput.name !== undefined)
      product.name = updateProductInput.name;
    if (updateProductInput.description !== undefined)
      product.description = updateProductInput.description;
    if (updateProductInput.price !== undefined)
      product.price = updateProductInput.price;
    if (updateProductInput.imageUrl !== undefined)
      product.imageUrl = updateProductInput.imageUrl;
    if (updateProductInput.categoryId !== undefined)
      product.categoryId = updateProductInput.categoryId;
    if (updateProductInput.sizes !== undefined)
      product.sizes = updateProductInput.sizes;
    if (updateProductInput.colors !== undefined)
      product.colors = updateProductInput.colors;
    if (updateProductInput.fit !== undefined)
      product.fit = updateProductInput.fit;
    if (updateProductInput.isNew !== undefined)
      product.isNew = updateProductInput.isNew;
    return this.productRepository.save(product);
  }
  async remove(id: number): Promise<Product> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return product;
  }
}
