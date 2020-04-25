import { AbstractRepository, EntityRepository } from 'typeorm';
import { Car } from '../entities/car.entity';
import { CarId } from '../types';
import { EntityNotFoundException } from '../exceptions/entity-not-found.exception';

@EntityRepository(Car)
export class CarRepository extends AbstractRepository<Car> {
  public async findById(id: CarId): Promise<Car> {
    const car = await this.repository.findOne({ where: { id } });

    if (!car) {
      throw new EntityNotFoundException('Car not found');
    }

    return car;
  }

  public getAll(): Promise<Car[]> {
    return this.repository.find();
  }

  public async getCarsRegisteredInPeriod(from: Date, to: Date): Promise<Car[]> {
    return this.repository
      .createQueryBuilder('car')
      .where('car.firstRegistrationDate BETWEEN DATE(:from) AND DATE(:to)', {
        from,
        to,
      })
      .leftJoinAndSelect('car.manufacturer', 'manufacturer')
      .leftJoinAndSelect('car.owners', 'owner')
      .getMany();
  }

  public save(car: Car): Promise<Car> {
    return this.repository.save(car);
  }

  public remove(car: Car): Promise<Car> {
    return this.repository.remove(car);
  }
}
