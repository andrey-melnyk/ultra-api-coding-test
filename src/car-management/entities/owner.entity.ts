import { OwnerId } from '../types/types';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { OwnerDTO } from '../dto/owner.dto';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Owner {
  @PrimaryColumn()
  private id: OwnerId;

  @Column()
  private name: string;

  @Column()
  private purchaseDate: Date;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static createNew(name: string, purchaseDate: Date): Owner {
    const newOwner = new Owner();

    newOwner.id = uuidv4();
    newOwner.name = name;
    newOwner.purchaseDate = purchaseDate;

    return newOwner;
  }

  public toDTO(): OwnerDTO {
    return new OwnerDTO(this.id, this.name, this.purchaseDate);
  }
}
