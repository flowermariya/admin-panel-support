import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity'; // Ensure you have a Customer entity defined
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PaginationDto } from 'src/product/dto/pagination.dto';
import { Filter } from 'src/enums/filter';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(
    createCustomerDto: CreateCustomerDto,
    user: any,
  ): Promise<Customer> {
    try {
      const newCustomer = this.customerRepository.create({
        ...createCustomerDto,
        createdBy: user?.id,
      });
      return await this.customerRepository.save(newCustomer);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(user: any, params: PaginationDto): Promise<Customer[]> {
    try {
      const { limit = 5, skip = 0, belongsTo = Filter.ALL } = params;

      const query = belongsTo == Filter.OWNER ? { createdBy: user?.id } : {};

      return await this.customerRepository.find({
        where: query,
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

  async findOne(id: string): Promise<Customer> {
    try {
      const customer = await this.customerRepository.findOne({ where: { id } });
      if (!customer) {
        throw new Error(`Customer with ID ${id} not found`);
      }
      return customer;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
    user: any,
  ): Promise<Customer> {
    try {
      await this.findOne(id);
      const customer = await this.customerRepository.preload({
        id,
        ...updateCustomerDto,
        updatedBy: user?.id,
      });

      if (!customer) {
        throw new Error(`Customer with ID #${id} not found`);
      }

      return this.customerRepository.save(customer);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async search(customerName: string): Promise<Customer[]> {
    try {
      return await this.customerRepository.find({
        where: { customerName: Like(`%${customerName}%`) },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<any> {
    try {
      await this.findOne(id);
      await this.customerRepository.delete(id);
      return 'Customer deleted successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
