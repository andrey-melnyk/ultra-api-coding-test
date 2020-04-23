import { ManufacturerId, OwnerId } from '../types';

export class CreateCarDto {
  price: number;
  firstRegistrationDate: Date;
  manufacturerId: ManufacturerId;
  ownerIds: OwnerId[];
}
