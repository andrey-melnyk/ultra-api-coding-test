import { Manufacturer } from './manufacturer.entity';
import { Owner } from './owner.entity';
import { CarId } from '../types/types';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { CarDTO } from '../dto/car.dto';
import { InvalidPriceException } from '../exceptions/invalid-price.exception';
import { InvalidFirstRegistrationDateException } from '../exceptions/invalid-first-registration-date.exception';
import { InvalidDiscountException } from '../exceptions/invalid-discount.exception';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Car {
  @PrimaryColumn()
  private id: CarId;

  @Column()
  private price: number;

  @Column()
  private firstRegistrationDate: Date;

  @ManyToOne(() => Manufacturer, { eager: true })
  private manufacturer: Manufacturer;

  @ManyToMany(() => Owner, { eager: true })
  @JoinTable()
  private owners: Owner[];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static createNew(
    price: number,
    firstRegistrationDate: Date,
    manufacturer: Manufacturer,
    owners: Owner[],
  ): Car {
    const newCar = new Car();

    newCar.id = uuidv4();
    newCar.updatePrice(price);
    newCar.initFirstRegistrationDate(firstRegistrationDate);
    newCar.manufacturer = manufacturer;
    newCar.owners = owners;

    return newCar;
  }

  public getPrice(): number {
    return this.price;
  }

  public updatePrice(newPrice: number): void {
    if (newPrice < 0) {
      throw new InvalidPriceException();
    }

    this.price = newPrice;
  }

  public updateOwnersList(owners: Owner[]): void {
    this.owners = owners;
  }

  public applyDiscount(discount: number): void {
    if (discount < 0 || discount > this.price) {
      throw new InvalidDiscountException();
    }

    this.updatePrice(this.price - discount);
  }

  private initFirstRegistrationDate(firstRegistrationDate: Date): void {
    if (
      Number.isNaN(firstRegistrationDate.getTime()) ||
      firstRegistrationDate.getTime() > new Date().getTime()
    ) {
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
