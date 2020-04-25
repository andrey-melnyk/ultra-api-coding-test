import { ManufacturerId, OwnerId } from '../types/types';
import { IsDate, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { NotFutureDate } from '../../common/validation-decorators/not-future-date.decorator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsDate()
  @NotFutureDate({
    message: 'firstRegistrationDate must be earlier than today',
  })
  firstRegistrationDate: Date;

  @IsNotEmpty()
  manufacturerId: ManufacturerId;

  @IsNotEmpty()
  ownerIds: OwnerId[];
}
