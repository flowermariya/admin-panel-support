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
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Sale } from './entities/sale.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PaginationDto } from 'src/product/dto/pagination.dto';

@ApiTags('Sales')
@ApiBearerAuth('JWT-auth')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sale' })
  @ApiCreatedResponse({
    description: 'The sale has been successfully created.',
    type: CreateSaleDto,
  })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createSaleDto: CreateSaleDto, @Req() req: any): Promise<Sale> {
    return this.salesService.create(createSaleDto, req?.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sales' })
  @ApiResponse({
    status: 200,
    description: 'Sales has been successfully created',
    type: [Sale],
  })
  @ApiOkResponse({ description: 'Array of all sales', type: [CreateSaleDto] })
  findAll(@Req() req: any, @Query() params?: PaginationDto) {
    return this.salesService.findAll(req?.user, params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sale by id' })
  @ApiOkResponse({ description: 'The sale details', type: CreateSaleDto })
  @ApiNotFoundResponse({ description: 'Sale not found' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the sale' })
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sale' })
  @ApiOkResponse({
    description: 'The sale has been successfully updated',
    type: UpdateSaleDto,
  })
  @ApiNotFoundResponse({ description: 'Sale not found' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the sale to be updated',
  })
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(id, updateSaleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sale' })
  @ApiOkResponse({ description: 'The sale has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Sale not found' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the sale to be deleted',
  })
  remove(@Param('id') id: string) {
    return this.salesService.remove(id);
  }
}
