import { AbstractRepository, EntityRepository } from 'typeorm';
import { Car } from '../entities/car.entity';
import { CarId } from '../types';

@EntityRepository(Car)
export class CarRepository extends AbstractRepository<Car> {
  public findById(id: CarId): Promise<Car> {
    return this.repository.findOne({ where: { id } })
  }

  public getAll(): Promise<Car[]> {
    return this.repository.find();
  }

  public save(car: Car): Promise<Car> {
    return this.repository.save(car);
  }
}
