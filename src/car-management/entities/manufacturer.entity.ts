import { ManufacturerId } from '../types/types';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ManufacturerDTO } from '../dto/manufacturer.dto';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Manufacturer {
  @PrimaryColumn()
  private id: ManufacturerId;

  @Column()
  private name: string;

  @Column()
  private phone: string;

  @Column()
  private siret: number;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static createNew(
    name: string,
    phone: string,
    siret: number,
  ): Manufacturer {
    const newManufacturer = new Manufacturer();

    newManufacturer.id = uuidv4();
    newManufacturer.name = name;
    newManufacturer.phone = phone;
    newManufacturer.siret = siret;

    return newManufacturer;
  }

  public toDTO(): ManufacturerDTO {
    return new ManufacturerDTO(this.id, this.name, this.phone, this.siret);
  }
}
