import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { OwnerId } from '../types';

export class UpdateCarDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  ownerIds: OwnerId[];
}
