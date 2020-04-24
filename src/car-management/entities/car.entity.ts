import { Manufacturer } from './manufacturer.entity';
import { Owner } from './owner.entity';
import { CarId } from '../types';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarDTO } from '../dto/car.dto';
import { InvalidPriceException } from '../exceptions/invalid-price.exception';
import { InvalidFirstRegistrationDateException } from '../exceptions/invalid-first-registration-date.exception';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  private id: CarId;

  @Column()
  private price: number;

  @Column()
  private firstRegistrationDate: Date;

  @ManyToOne(type => Manufacturer, { eager: true })
  private manufacturer: Manufacturer;

  @ManyToMany(type => Owner, { eager: true })
  @JoinTable()
  private owners: Owner[];

  private constructor() {}

  public static createNew(
    price: number,
    firstRegistrationDate: Date,
    manufacturer: Manufacturer,
    owners: Owner[],
  ): Car {
    const newCar = new Car();
    newCar.updatePrice(price);
    newCar.setFirstRegistrationDate(firstRegistrationDate);
    newCar.manufacturer = manufacturer;
    newCar.owners = owners;
    return newCar;
  }

  public updatePrice(newPrice: number): void {
    if (newPrice < 0) {
      throw new InvalidPriceException();
    }

    this.price = newPrice;
  }

  private setFirstRegistrationDate(firstRegistrationDate: Date): void {
    if (firstRegistrationDate.getTime() > new Date().getTime()) {
      throw new InvalidFirstRegistrationDateException();
    }

    this.firstRegistrationDate = firstRegistrationDate;
  }

  public toDTO(): CarDTO {
    return new CarDTO(
      this.id,
      this.price,
      this.firstRegistrationDate,
      this.manufacturer.toDTO(),
      this.owners.map((owner: Owner) => owner.toDTO()),
    );
  }
}
