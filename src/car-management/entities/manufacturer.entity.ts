import { ManufacturerId } from '../types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
