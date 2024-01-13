import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { BaseEntityModel } from 'src/utils/base.schema';

export class LoginDto extends BaseEntityModel {
  @ApiProperty({
    description: 'The email address of the admin.',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  username: string;

  @ApiProperty({
    description: 'The password of the admin.',
    maxLength: 100,
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  password: string;
}
