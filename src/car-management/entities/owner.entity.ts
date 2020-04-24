import { OwnerId } from '../types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OwnerDTO } from '../dto/owner.dto';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  private id: OwnerId;

  @Column()
  private name: string;

  @Column()
  private purchaseDate: Date;

  public toDTO(): OwnerDTO {
    return new OwnerDTO(this.id, this.name, this.purchaseDate);
  }
}
