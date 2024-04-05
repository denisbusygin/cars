import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto, id: number) {
    const isCar = await this.carRepository.findBy({
      user: { id },
      brand: createCarDto.brand,
      model: createCarDto.model,
      year: createCarDto.year,
    });
    if (isCar.length)
      throw new BadRequestException('Данный автомобиль уже есть');

    const newCar = {
      brand: createCarDto.brand,
      model: createCarDto.model,
      year: createCarDto.year,
      user: { id },
    };

    return await this.carRepository.save(newCar);
  }

  async findUserByCarBrand(brand: string): Promise<Car[]> {
    const cars = await this.carRepository
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.user', 'user')
      .where('car.brand = :brand', { brand })
      .getMany();

    if (!cars || cars.length === 0) {
      throw new NotFoundException('Данного бренда нет в базе');
    }

    return cars;
  }

  async findOneByUserId(user_id: number) {
    const cars = await this.carRepository.find({
      where: { user: { id: user_id } }, // или может потребоваться изменить на { user: { id: user_id }}, в зависимости от структуры вашей базы данных и связей между сущностями
      relations: ['user'],
    });

    if (!cars || cars.length === 0) {
      throw new NotFoundException(
        'Автомобили для данного пользователя не найдены',
      );
    }

    return cars;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.carRepository.findOne({
      where: { id },
    });

    if (!car) throw new NotFoundException('Автомобиль не найден');

    return await this.carRepository.update(id, updateCarDto);
  }

  async remove(id: number) {
    const car = await this.carRepository.findOne({
      where: { id },
    });
    if (!car) throw new NotFoundException('Автомобиль не найден');

    return await this.carRepository.delete(id);
  }
}
