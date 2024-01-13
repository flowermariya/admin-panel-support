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
  @IsOptional()
  @IsString()
  @Length(0, 255)
  code?: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 255)
  itemName: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  batchCode?: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  qty: number;

  @IsNotEmpty()
  @IsDecimal()
  @Min(0)
  unitPrice: number;

  @IsOptional()
  @IsDecimal()
  @Min(0)
  mrp?: number;

  @IsOptional()
  @IsDecimal()
  @Min(0)
  taxValue?: number;

  @IsOptional()
  @IsDecimal()
  @Min(0)
  @Max(100)
  gstPercentage?: number;

  @IsOptional()
  @IsDecimal()
  @Min(0)
  gstAmount?: number;

  @IsNotEmpty()
  @IsDecimal()
  @Min(0)
  total: number;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  staff?: string;
}
