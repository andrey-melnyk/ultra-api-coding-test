import { AbstractRepository, EntityRepository, In } from 'typeorm';
import { OwnerId } from '../types';
import { Owner } from '../entities/owner.entity';

@EntityRepository(Owner)
export class OwnerRepository extends AbstractRepository<Owner> {
  public findByIdsArray(ids: OwnerId[]): Promise<Owner[]> {
    return this.repository.find({ where: { id: In(ids) } });
  }
}
