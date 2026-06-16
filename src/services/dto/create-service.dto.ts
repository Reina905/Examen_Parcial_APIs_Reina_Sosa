import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: 'Diseño de logo profesional' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Diseño' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'Incluye manual de marca y formatos vectoriales.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 150.00 })
  @IsNumber()
  @Min(1)
  price: number;
}