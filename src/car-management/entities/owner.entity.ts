import { OwnerId } from '../types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  private id: OwnerId;

  @Column()
  private name: string;

  @Column()
  private purchaseDate: Date;
}
