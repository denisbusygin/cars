import { Car } from 'src/cars/entities/car.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userName: string | null;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(() => Car, (car) => car.user)
  cars: Car[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
