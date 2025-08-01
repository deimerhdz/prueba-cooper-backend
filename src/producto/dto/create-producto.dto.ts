import { ApiProperty } from '@nestjs/swagger';
export class CreateProductoDto {
  @ApiProperty({ required: true })
  nombre: string;
  @ApiProperty()
  descripcion?: string;
  @ApiProperty({ required: true })
  precio: number;
  @ApiProperty({ required: true })
  categoria: string;
}
