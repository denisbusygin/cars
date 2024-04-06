import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'example@example.example',
    required: true,
    nullable: false,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: '+79999999999',
    required: true,
    nullable: false,
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsOptional()
  userName: string;

  @ApiProperty()
  @MinLength(6, { message: 'Пароль меньше 6 символов' })
  password: string;
}
