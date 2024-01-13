import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'; // Import Swagger decorators
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

export class CreateAdminDto {
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
    default: Gender.Other,
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

  @ApiProperty({
    description: 'The email address of the admin.',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({
    description: 'The password of the admin.',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsEmail()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @ApiPropertyOptional({
    description: 'The role of the admin.',
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  role: string;
}
