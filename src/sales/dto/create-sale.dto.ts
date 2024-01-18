import {
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
  IsNumber,
  Min,
  MinLength,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionMode } from 'src/enums/transaction.mode';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';

export class CreateSaleDto {
  @ApiProperty({ description: 'Bill number', default: '' })
  @IsString()
  @MinLength(1)
  billNo: string;

  @ApiProperty({ description: 'Bill date', type: Date })
  @IsDate()
  @Type(() => Date)
  billDate: Date;

  @ApiPropertyOptional({
    description: 'E-way bill number',
    nullable: true,
    default: '',
  })
  @IsOptional()
  @IsString()
  eWayBillNumber?: string;

  @ApiProperty({ description: 'Delivery date', type: Date })
  @IsDate()
  @Type(() => Date)
  deliveryDate: Date;

  @ApiProperty({
    description: 'Customer Details',
    type: () => CreateCustomerDto,
  })
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: CreateCustomerDto;

  // For products, include ApiProperty with a proper description
  // @ApiProperty({ description: 'Array of product IDs' })
  // products: ProductDto[];

  @ApiProperty({ description: 'Staff ID', default: '' })
  @IsString()
  @IsUUID()
  staffId: string;

  @ApiProperty({ description: 'Staff ID', default: '' })
  @IsString()
  @IsUUID()
  productId: string;

  @ApiPropertyOptional({
    description: 'Additional note',
    required: false,
    default: '',
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional({
    description: 'Vehicle number',
    nullable: true,
    default: '',
  })
  @IsOptional()
  @IsString()
  vehicleNumber?: string;

  @ApiPropertyOptional({
    description: 'Delivery charge',
    nullable: true,
    default: '',
  })
  @IsOptional()
  @IsString()
  deliveryCharge?: string;

  @ApiPropertyOptional({
    description: 'Payment mode',
    enum: TransactionMode,
    default: TransactionMode.CASH,
  })
  @IsOptional()
  @IsEnum(TransactionMode)
  paymentMode: TransactionMode;

  @ApiPropertyOptional({
    description: 'Outstanding amount',
    type: Number,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  outStanding: number;

  @ApiProperty({
    description: 'Total taxable amount',
    type: Number,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  totalTaxableAmount: number;

  @ApiPropertyOptional({ description: 'GST amount', type: Number, default: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  gstAmount: number;

  @ApiPropertyOptional({
    description: 'Discount',
    required: false,
    type: Number,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discount?: number;

  @ApiPropertyOptional({
    description: 'Round off amount',
    required: false,
    type: Number,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  roundOff?: number;

  @ApiProperty({ description: 'Grand total', type: Number, default: 0 })
  @IsNumber()
  @Min(0)
  grandTotal: number;
}
