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

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  create(@Body() createCarDto: CreateCarDto, @Req() req) {
    return this.carsService.create(createCarDto, +req.user.id);
  }

  @Get(':brand')
  findUserByCarBrand(@Param('brand') brand: string): Promise<Car[]> {
    return this.carsService.findUserByCarBrand(brand);
  }

  @Get('users/:user_id')
  @UseGuards(JwtAuthGuard)
  findOneByUserId(@Param('user_id') user_id: string) {
    return this.carsService.findOneByUserId(+user_id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
