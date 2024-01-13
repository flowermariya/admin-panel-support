import {
  IsEnum,
  IsOptional,
  IsString,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { TransactionMode } from 'src/enums/transaction.mode';

export class CreateCustomerDto {
  @IsString()
  customerName: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  deliveryAddress?: string;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsEnum(TransactionMode)
  transactionMode: TransactionMode;

  @IsBoolean()
  isIGST: boolean;
}
