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

  async findAll(user: any): Promise<Product[]> {
    try {
      return this.productRepository.find({ where: { createdBy: user?.id } });
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
      await this.findOne(id);
      const product = await this.productRepository.preload({
        id,
        ...updateProductDto,
        updatedBy: user?.id, // Any one can may or may not update products since these are admin products, so tracking the updated user
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
      await this.findOne(id);
      await this.productRepository.delete(id);
      return 'Product deleted successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
