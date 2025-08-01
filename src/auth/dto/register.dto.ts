import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  nombres: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
