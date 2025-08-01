import { CreateProductoDto } from './create-producto.dto';
import { PartialType } from '@nestjs/swagger';
export class UpdateProductoDto extends PartialType(CreateProductoDto) {}
