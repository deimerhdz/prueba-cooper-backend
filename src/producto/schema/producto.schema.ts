import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ProductoDocument = Producto & Document;
@Schema()
export class Producto {
  @Prop({ required: true })
  nombre: string;
  @Prop()
  descripcion?: string;
  @Prop()
  precio?: number;
  @Prop()
  categoria: string;
}
export const ProductoSchema = SchemaFactory.createForClass(Producto);
