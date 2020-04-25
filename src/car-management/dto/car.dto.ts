import { CarId } from '../types/types';
import { ManufacturerDTO } from './manufacturer.dto';
import { OwnerDTO } from './owner.dto';

export class CarDTO {
  public readonly id: CarId;
  public readonly price: number;
  public readonly firstRegistrationDate: Date;
  public readonly manufacturer: ManufacturerDTO;
  public readonly owners: OwnerDTO[];

  constructor(
    id: CarId,
    price: number,
    firstRegistrationDate: Date,
    manufacturer: ManufacturerDTO,
    owners: OwnerDTO[],
  ) {
    this.id = id;
    this.price = price;
    this.firstRegistrationDate = firstRegistrationDate;
    this.manufacturer = manufacturer;
    this.owners = owners;
  }
}
