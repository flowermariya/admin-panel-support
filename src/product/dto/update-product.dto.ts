import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsInt,
  IsString,
  Length,
  IsNotEmpty,
  Min,
  Max,
} from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({ default: '' })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  itemName: string;

  @ApiPropertyOptional({ default: '' })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  batchCode?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  qty: number;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Min(1)
  unitPrice: number;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
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

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @Min(0)
  total: number;

  @ApiPropertyOptional({ default: '' })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  staff?: string;
}
