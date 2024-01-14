import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
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
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PaginationDto } from 'src/product/dto/pagination.dto';

@ApiTags('Customer')
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
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiBody({ type: CreateCustomerDto })
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @Req() req: any,
  ): Promise<Customer> {
    return await this.customerService.create(createCustomerDto, req?.user);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all customers' })
  @ApiResponse({
    status: 200,
    description: 'List of all customers',
    type: [CreateCustomerDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req: any, @Query() params?: PaginationDto) {
    return await this.customerService.findAll(req?.user, params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a customer by id' })
  @ApiResponse({
    status: 200,
    description: 'The customer details',
    type: CreateCustomerDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  @ApiParam({ name: 'id', description: 'The customer ID' })
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.customerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a customer' })
  @ApiOkResponse({
    description: 'The customer has been successfully updated',
    type: UpdateCustomerDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  @ApiParam({ name: 'id', description: 'The customer ID' })
  @ApiBody({ type: UpdateCustomerDto })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Req() req: any,
  ) {
    return await this.customerService.update(id, updateCustomerDto, req?.user);
  }

  @Get('search/:customerName')
  @ApiParam({
    name: 'customerName',
    required: true,
    description: 'The name of the item to search for',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiOperation({ summary: 'Search for customers by name' })
  @ApiResponse({
    status: 200,
    description: 'List of customers matching the name',
    type: [Customer],
  })
  @UseGuards(JwtAuthGuard)
  async search(
    @Param('customerName') customerName: string,
  ): Promise<Customer[]> {
    return await this.customerService.search(customerName);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer' })
  @ApiOkResponse({ description: 'The customer has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  @ApiParam({ name: 'id', description: 'The customer ID' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req: any) {
    return await this.customerService.remove(id);
  }
}
