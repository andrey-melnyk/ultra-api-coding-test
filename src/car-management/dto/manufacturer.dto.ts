import { ManufacturerId } from '../types';

export class ManufacturerDTO {
  public readonly id: ManufacturerId;
  public readonly name: string;
  public readonly phone: string;
  public readonly siret: number;

  constructor(id: ManufacturerId, name: string, phone: string, siret: number) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.siret = siret;
  }
}
