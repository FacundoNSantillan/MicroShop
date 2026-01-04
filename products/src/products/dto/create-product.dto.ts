import { IsString, IsNumber, IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Teclado mecánico' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Switches blue', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 199.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 'Periféricos' })
  @IsString()
  category: string;
}
