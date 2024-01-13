import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsInt,
  IsDecimal,
  IsString,
  Length,
  IsNotEmpty,
  Min,
  Max,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ default: '' })
  @IsNotEmpty()
  @IsString()
  @Length(0, 255)
  code?: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  @IsString()
  @Length(0, 255)
  itemName: string;

  @ApiPropertyOptional({ default: '' })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  batchCode?: string;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  qty: number;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @Min(1)
  unitPrice: number;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @Min(1)
  mrp?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @Min(0)
  taxValue?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @Min(0)
  @Max(100)
  gstPercentage?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @Min(0)
  gstAmount?: number;

  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  @Min(0)
  total: number;

  @ApiPropertyOptional({ default: '' })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  staff?: string;
}
