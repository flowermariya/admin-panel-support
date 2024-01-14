import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  MinLength,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { TransactionMode } from 'src/enums/transaction.mode';

export class CreateCustomerDto {
  @ApiProperty({ default: '' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  customerName: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  phoneNumber?: string;

  @ApiPropertyOptional({ default: '' })
  @IsOptional()
  @MinLength(10)
  @MaxLength(100)
  @IsString()
  address?: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(100)
  @IsString()
  deliveryAddress?: string;

  @ApiProperty({ default: TransactionMode.CASH, enum: TransactionMode })
  @IsNotEmpty()
  @IsEnum(TransactionMode)
  Mode: TransactionMode;

  @ApiProperty({ default: false })
  @IsNotEmpty()
  @IsBoolean()
  isGST: boolean;
}
