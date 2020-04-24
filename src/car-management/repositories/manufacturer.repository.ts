import { AbstractRepository, EntityRepository } from 'typeorm';
import { ManufacturerId } from '../types';
import { Manufacturer } from '../entities/manufacturer.entity';

@EntityRepository(Manufacturer)
export class ManufacturerRepository extends AbstractRepository<Manufacturer> {
  public findById(id: ManufacturerId): Promise<Manufacturer> {
    return this.repository.findOne({ where: { id } })
  }
}
