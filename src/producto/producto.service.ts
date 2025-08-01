import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto, ProductoDocument } from './schema/producto.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel(Producto.name) private readonly model: Model<ProductoDocument>,
  ) {}
  async create(createProductoDto: CreateProductoDto) {
    return await new this.model(createProductoDto).save();
  }

  async findAll() {
    return await this.model.find().exec();
  }

  async findOne(id: number) {
    return await this.model.findById(id).exec();
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    return await this.model.findByIdAndUpdate(id, updateProductoDto).exec();
  }

  async remove(id: number) {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
