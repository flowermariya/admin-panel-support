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

export class UpdateCustomerDto {
  @ApiPropertyOptional({ default: '' })
  @IsString()
  @IsOptional()
  @MinLength(3)
  customerName: string;

  @ApiPropertyOptional()
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ default: '' })
  @IsOptional()
  @MinLength(10)
  @MaxLength(100)
  @IsString()
  address?: string;

  @ApiPropertyOptional({ default: '' })
  @IsOptional()
  @MinLength(10)
  @MaxLength(100)
  @IsString()
  deliveryAddress?: string;

  @ApiPropertyOptional({ default: TransactionMode.CASH, enum: TransactionMode })
  @IsOptional()
  @IsEnum(TransactionMode)
  Mode: TransactionMode;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isIGST: boolean;
}
