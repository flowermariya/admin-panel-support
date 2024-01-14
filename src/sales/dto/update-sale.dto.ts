import {
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionMode } from 'src/enums/transaction.mode';

export class UpdateSaleDto {
  @ApiPropertyOptional({ description: 'Delivery date', type: Date })
  @IsDate()
  @Type(() => Date)
  deliveryDate: Date;

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
    required: false,
    default: '',
  })
  @IsOptional()
  @IsString()
  vehicleNumber?: string;

  @ApiPropertyOptional({
    description: 'Delivery charge',
    required: false,
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
  @IsEnum(TransactionMode)
  paymentMode: TransactionMode;

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
}
