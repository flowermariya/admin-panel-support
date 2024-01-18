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

  @ApiPropertyOptional({ default: '', nullable: true })
  @IsOptional()
  @MinLength(10)
  @MaxLength(100)
  @IsString()
  address?: string;

  @ApiPropertyOptional({ default: '', nullable: true })
  @IsOptional()
  @MinLength(10)
  @MaxLength(100)
  @IsString()
  deliveryAddress?: string;

  @ApiPropertyOptional({
    default: TransactionMode.CASH,
    enum: TransactionMode,
    nullable: true,
  })
  @IsOptional()
  @IsEnum(TransactionMode)
  Mode: TransactionMode;

  @ApiPropertyOptional({ default: false, nullable: true })
  @IsOptional()
  @IsBoolean()
  isGST: boolean;
}
