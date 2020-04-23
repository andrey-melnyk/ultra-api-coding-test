import { Manufacturer } from './manufacturer.entity';
import { Owner } from './owner.entity';

export class Car {
  id: string;
  manufacturer: Manufacturer;
  price: number;
  firstRegistrationDate: Date;
  owners: Owner[];
}
