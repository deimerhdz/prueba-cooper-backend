import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('register')
  findAll(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
