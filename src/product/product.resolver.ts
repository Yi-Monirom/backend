import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll(
    @Args('categoryId', { type: () => Int, nullable: true })
    categoryId?: number,
    @Args('sizes', { type: () => [String], nullable: true }) sizes?: string[],
    @Args('color', { type: () => String, nullable: true }) color?: string,
    @Args('fit', { type: () => String, nullable: true }) fit?: string,
    @Args('newArrivals', { type: () => Boolean, nullable: true })
    newArrivals?: boolean,
  ) {
    if (newArrivals) {
      return this.productService.findNewArrivals();
    }
    if (categoryId) {
      return this.productService.findByCategory(categoryId);
    }
    if (sizes || color || fit) {
      return this.productService.filter(sizes, color, fit);
    }
    return this.productService.findAll();
  }

  @Query(() => [Product], { name: 'searchProducts' })
  searchProducts(@Args('query') query: string) {
    return this.productService.search(query);
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }
}
