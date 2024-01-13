import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: Product,
  })
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Array of products',
    type: [Product],
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiResponse({
    status: 200,
    description: 'The found product',
    type: Product,
  })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get('search')
  @ApiQuery({
    name: 'itemName',
    required: true,
    description: 'The name of the item to search for',
  })
  @ApiOperation({ summary: 'Search for products by item name' })
  @ApiResponse({
    status: 200,
    description: 'List of products matching the item name',
    type: [Product],
  })
  search(@Query('itemName') itemName: string) {
    return this.productService.searchByItemName(itemName);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 200,
    description: 'The updated product',
    type: Product,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateProductDto })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
  })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
