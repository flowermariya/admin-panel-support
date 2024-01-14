import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Filter } from 'src/enums/filter';

export class PaginationDto {
  @ApiPropertyOptional({ default: 0, nullable: true })
  @IsOptional()
  skip?: number;

  @ApiPropertyOptional({ default: 15, nullable: true })
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ default: Filter.ALL, enum: Filter, nullable: true })
  @IsOptional()
  @IsEnum(Filter)
  belongsTo?: Filter;
}
