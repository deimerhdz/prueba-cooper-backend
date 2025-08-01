import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
export class CreateProductoDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  nombre: string;
  @ApiProperty()
  @IsOptional()
  descripcion?: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsPositive()
  precio: number;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  categoria: string;
}
