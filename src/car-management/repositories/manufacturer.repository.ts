import { AbstractRepository, EntityRepository } from 'typeorm';
import { ManufacturerId } from '../types/types';
import { Manufacturer } from '../entities/manufacturer.entity';
import { EntityNotFoundException } from '../exceptions/entity-not-found.exception';

@EntityRepository(Manufacturer)
export class ManufacturerRepository extends AbstractRepository<Manufacturer> {
  public async findById(id: ManufacturerId): Promise<Manufacturer> {
    const manufacturer = await this.repository.findOne({ where: { id } });

    if (!manufacturer) {
      throw new EntityNotFoundException('Manufacturer not found');
    }

    return manufacturer;
  }
}
