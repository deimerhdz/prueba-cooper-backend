import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.getHashedPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    return await new this.model(createUserDto).save();
  }

  async findOneByEmail(email: string): Promise<any> {
    return await this.model.findOne({ email }).select('+password');
  }
  async getHashedPassword(password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }
}
