import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({
    type: String,
    example: 'Lada',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    type: String,
    example: 'Granta',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    type: Number,
    example: '2017',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  year: number;
}
