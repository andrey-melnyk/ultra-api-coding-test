import { OwnerId } from '../types';

export class OwnerDTO {
  public readonly id: OwnerId;
  public readonly name: string;
  public readonly purchaseDate: Date;

  constructor(id: OwnerId, name: string, purchaseDate: Date) {
    this.id = id;
    this.name = name;
    this.purchaseDate = purchaseDate;
  }
}
