import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Car } from './entities/car.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('ApiCarCrud')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post('create')
  @ApiOperation({
    description: 'создание автомобиля у владельца',
  })
  @ApiResponse({
    status: 200,
    description: 'автомобиль создан',
  })
  @ApiResponse({
    status: 400,
    description: 'Данный автомобиль уже есть',
  })
  @ApiResponse({
    status: 500,
    description: 'Внутренняя ошибка сервера',
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  create(@Body() createCarDto: CreateCarDto, @Req() req) {
    return this.carsService.create(createCarDto, +req.user.id);
  }

  @Get(':brand')
  @ApiOperation({
    description: 'пользователи автомобиля определенной марки',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователи найдены',
  })
  @ApiResponse({
    status: 400,
    description: 'Данного бренда нет в базе',
  })
  @ApiResponse({
    status: 500,
    description: 'Внутренняя ошибка сервера',
  })
  findUserByCarBrand(@Param('brand') brand: string): Promise<Car[]> {
    return this.carsService.findUserByCarBrand(brand);
  }

  @Get('users/:user_id')
  @ApiOperation({
    description: 'автомобили определенного пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Автомобили найдены',
  })
  @ApiResponse({
    status: 400,
    description: 'У пользователя нет автомобилей',
  })
  @ApiResponse({
    status: 500,
    description: 'Внутренняя ошибка сервера',
  })
  @UseGuards(JwtAuthGuard)
  findOneByUserId(@Param('user_id') user_id: string) {
    return this.carsService.findOneByUserId(+user_id);
  }

  @Patch(':id')
  @ApiOperation({
    description: 'изменение автомобиля пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'автомобиль успешно изменен',
  })
  @ApiResponse({
    status: 400,
    description: 'Данного автомобиля нет в базе',
  })
  @ApiResponse({
    status: 500,
    description: 'Внутренняя ошибка сервера',
  })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  @ApiOperation({
    description: 'удаление автомобиля определенной марки',
  })
  @ApiResponse({
    status: 200,
    description: 'автомобиль удален',
  })
  @ApiResponse({
    status: 400,
    description: 'автомобиль не найден',
  })
  @ApiResponse({
    status: 500,
    description: 'Внутренняя ошибка сервера',
  })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
