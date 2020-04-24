import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CarRepository } from '../repositories/car.repository';
import { EntityManager } from 'typeorm';
import { Car } from '../entities/car.entity';

@Injectable()
export class CarMarketService {
  private readonly carRepository: CarRepository;

  constructor(
    @InjectEntityManager() entityManager: EntityManager
  ) {
    this.carRepository = entityManager.getCustomRepository(CarRepository);
  }

  public applyDiscountToCarsRegisteredInPeriod(from: Date, to: Date, discountPercent): Promise<Car[]> {

  }
}
