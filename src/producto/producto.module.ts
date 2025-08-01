import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { Producto, ProductoSchema } from './schema/producto.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Producto.name, schema: ProductoSchema },
    ]),
  ],
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}
