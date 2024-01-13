import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/enums/gender';

export class UpdateAdminDto {
  @ApiProperty({
    description: 'The name of the admin.',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: 'The gender of the admin.',
    enum: Gender,
    default: Gender.OTHER,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: 'The phone number of the admin.',
    maxLength: 15,
  })
  @IsNotEmpty()
  @IsNumber()
  @MaxLength(10)
  phone: number;

  @ApiPropertyOptional({
    description: 'The role of the admin.',
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  role: string;
}
