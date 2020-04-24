import { ManufacturerId } from '../types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManufacturerDTO } from '../dto/manufacturer.dto';

@Entity()
export class Manufacturer {
  @PrimaryGeneratedColumn()
  private id: ManufacturerId;

  @Column()
  private name: string;

  @Column()
  private phone: string;

  @Column()
  private siret: number;

  public toDTO(): ManufacturerDTO {
    return new ManufacturerDTO(this.id, this.name, this.phone, this.siret);
  }
}
