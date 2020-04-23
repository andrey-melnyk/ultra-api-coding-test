import { Manufacturer } from './manufacturer.entity';
import { Owner } from './owner.entity';
import { CarId } from '../types';

export class Car {
  private id: CarId;
  private manufacturer: Manufacturer;
  private price: number;
  private firstRegistrationDate: Date;
  private owners: Owner[];

  constructor(
    manufacturer: Manufacturer,
    price: number,
    firstRegistrationDate: Date,
    owners: Owner[],
  ) {
    this.manufacturer = manufacturer;
    this.updatePrice(price);
    this.setFirstRegistrationDate(firstRegistrationDate);
    this.owners = owners;
  }

  public getId(): CarId {
    return this.id;
  }

  public getManufacturer(): Manufacturer {
    return this.manufacturer;
  }

  public getPrice(): number {
    return this.price;
  }

  public updatePrice(newPrice: number): void {
    this.price = newPrice > 0 ? newPrice : 0;
  }

  public getFirstRegistrationDate(): Date {
    return this.firstRegistrationDate;
  }

  public getOwners(): Owner[] {
    return this.owners;
  }

  private setFirstRegistrationDate(firstRegistrationDate: Date): void {
    this.firstRegistrationDate =
      firstRegistrationDate <= new Date() ? firstRegistrationDate : new Date();
  }
}
