import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    user: any,
  ): Promise<Product> {
    try {
      console.log(user);

      const newProduct = await this.productRepository.create({
        ...createProductDto,
        createdBy: user?.id,
      });
      return await this.productRepository.save(newProduct);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return this.productRepository.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new Error(`Product ${id} not found`);
      }
      return product;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async search(itemName: string): Promise<Product[]> {
    try {
      return await this.productRepository.find({
        where: { itemName: Like(`%${itemName}%`) },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    user: any,
  ): Promise<Product> {
    try {
      const item = await this.findOne(id);

      if (user?.id != item?.createdBy) {
        throw new UnauthorizedException(
          `You are not authorized to update this product, since you are not the creator of this product`,
        );
      }

      const product = await this.productRepository.preload({
        id,
        ...updateProductDto,
      });

      if (!product) {
        throw new Error(`Product ${id} not found`);
      }
      return this.productRepository.save(product);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string, user: any): Promise<any> {
    try {
      const product = await this.findOne(id);

      if (user?.id != product?.createdBy) {
        throw new UnauthorizedException(
          `You are not authorized to delete this product, since you are not the creator of this product`,
        );
      }

      await this.productRepository.delete(id);
      return 'Product deleted successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
