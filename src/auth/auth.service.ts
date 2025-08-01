import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    const isPasswordValid = await bcryptjs.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      token: token,
      user: {
        nombres: user.nombres,
        email: user.email,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.findOneByEmail(registerDto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const newUser: CreateUserDto = {
      ...registerDto,
      password: await bcryptjs.hash(registerDto.password, 10),
    };
    await this.userService.create(newUser);
    return {
      nombres: newUser.nombres,
      email: newUser.email,
    };
  }
}
