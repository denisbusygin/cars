import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Patch,
  UseGuards,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('ApiUserCrud')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('reg')
  @ApiOperation({
    description: 'создание юзера',
  })
  @ApiResponse({
    status: 200,
    description: 'пользователь создан',
  })
  @ApiResponse({
    status: 400,
    description: 'Данная почта или номер телефона уже зарегестрированы',
  })
  @ApiResponse({
    status: 500,
    description: 'Внутренняя ошибка сервера',
  })
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ description: 'получение данных с сервера' })
  @ApiResponse({
    status: 200,
    description: 'Данные с сервера получены',
  })
  @ApiResponse({
    status: 400,
    description: ' Пользователь не найден',
  })
  @ApiResponse({
    status: 500,
    description: ' Внутренняя ошибка сервера',
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ description: 'Изменение учетной записи' })
  @ApiResponse({
    status: 200,
    description: 'Учетная запись успешно изменена',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден',
  })
  @ApiResponse({
    status: 500,
    description: ' Внутренняя ошибка сервера',
  })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Удаление учетной записи' })
  @ApiResponse({
    status: 200,
    description: 'Учетная запись успешно удалена',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден',
  })
  @ApiResponse({
    status: 500,
    description: ' Внутренняя ошибка сервера',
  })
  @UseGuards(JwtAuthGuard)
  remove(@Param(':id') id: string) {
    return this.usersService.remove(+id);
  }
}
