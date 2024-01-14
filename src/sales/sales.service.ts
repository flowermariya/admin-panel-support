import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity'; // Import your Sale entity
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { AdminService } from 'src/admin/admin.service';
import { CustomerService } from 'src/customer/customer.service';
import { PaginationDto } from 'src/product/dto/pagination.dto';
import { Filter } from 'src/enums/filter';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
    private adminService: AdminService,
    private customerService: CustomerService,
    private productService: ProductService,
  ) {}

  async create(createSaleDto: CreateSaleDto, user: any): Promise<Sale> {
    try {
      const admin = await this.adminService.findOne(createSaleDto?.staffId);
      const customer = await this.customerService.create(
        createSaleDto.customer,
        user,
      );
      const product = await this.productService.findOne(
        createSaleDto?.productId,
      );

      if (!admin) {
        throw new NotFoundException(
          `Admin with ID #${createSaleDto.staffId} not found`,
        );
      }

      if (!customer) {
        throw new NotFoundException(
          `Customer with ID #${customer} not created successfully`,
        );
      }

      const newSale = this.salesRepository.create(createSaleDto);
      newSale.customer = customer;
      newSale.staff = admin;
      newSale.product = product;
      return await this.salesRepository.save(newSale);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'Bill Number already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(user: any, params: PaginationDto): Promise<Sale[]> {
    try {
      const { limit = 15, skip = 0, belongsTo = Filter.ALL } = params;

      const query = belongsTo == Filter.OWNER ? { createdBy: user?.id } : {};

      return await this.salesRepository.find({
        where: query,
        relations: ['customer', 'staff', 'product'],
        order: {
          createdAt: 'DESC',
        },
        skip,
        take: limit,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Sale> {
    try {
      const sale = await this.salesRepository.findOne({ where: { id } });
      if (!sale) {
        throw new NotFoundException(`Sale with ID #${id} not found`);
      }
      return sale;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    try {
      await this.findOne(id);
      const sale = await this.salesRepository.preload({
        id,
        ...updateSaleDto,
      });
      if (!sale) {
        throw new NotFoundException(`Sale with ID #${id} not found`);
      }
      return await this.salesRepository.save(sale);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<any> {
    try {
      await this.findOne(id);
      const result = await this.salesRepository.delete(id);
      return 'Sale Entry removed successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
