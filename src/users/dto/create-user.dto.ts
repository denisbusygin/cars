import { IsEmail, IsOptional, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  userName: string;

  @MinLength(6, { message: 'Пароль меньше 6 символов' })
  password: string;
}
