import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiParam,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Customer } from './entities/customer.entity';

@ApiTags('customer')
@ApiBearerAuth('JWT-auth')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiCreatedResponse({
    description: 'The customer has been successfully created.',
    type: CreateCustomerDto,
  })
  @ApiBody({ type: CreateCustomerDto })
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return await this.customerService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all customers' })
  @ApiResponse({
    status: 200,
    description: 'List of all customers',
    type: [CreateCustomerDto],
  })
  async findAll() {
    return await this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a customer by id' })
  @ApiResponse({
    status: 200,
    description: 'The customer details',
    type: CreateCustomerDto,
  })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  @ApiParam({ name: 'id', description: 'The customer ID' })
  async findOne(@Param('id') id: string) {
    return await this.customerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a customer' })
  @ApiOkResponse({
    description: 'The customer has been successfully updated',
    type: UpdateCustomerDto,
  })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  @ApiParam({ name: 'id', description: 'The customer ID' })
  @ApiBody({ type: UpdateCustomerDto })
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return await this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer' })
  @ApiOkResponse({ description: 'The customer has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  @ApiParam({ name: 'id', description: 'The customer ID' })
  async remove(@Param('id') id: string) {
    return await this.customerService.remove(id);
  }
}
