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
    default: '',
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
    default: 123,
  })
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @ApiProperty({
    description: 'The email address of the admin.',
    maxLength: 10,
    default: '',
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({
    description: 'The password of the admin.',
    maxLength: 100,
    default: '',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @ApiPropertyOptional({
    description: 'The role of the admin.',
    maxLength: 50,
    default: '',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  role: string;
}
