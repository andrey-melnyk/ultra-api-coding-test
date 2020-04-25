import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CarRepository } from '../repositories/car.repository';
import { EntityManager } from 'typeorm';
import { Car } from '../entities/car.entity';
import { CarDiscountCalculator } from '../car-discount-calculator.class';

@Injectable()
export class CarMarketService {
  private readonly entityManager: EntityManager;
  private readonly carRepository: CarRepository;
  private readonly discountCalculator: CarDiscountCalculator;

  constructor(
    @InjectEntityManager() entityManager: EntityManager,
    discountCalculator: CarDiscountCalculator,
  ) {
    this.entityManager = entityManager;
    this.carRepository = entityManager.getCustomRepository(CarRepository);
    this.discountCalculator = discountCalculator;
  }

  public async applyDiscountToCarsRegisteredInPeriod(
    from: Date,
    to: Date,
    discountPercent: number,
  ): Promise<Car[]> {
    const cars = await this.carRepository.getCarsRegisteredInPeriod(from, to);

    return await this.entityManager.transaction<Car[]>(
      (transactionalEntityManager: EntityManager) => {
        cars.forEach(car =>
          car.applyDiscount(
            this.discountCalculator.calculatePercentDiscount(
              car.getPrice(),
              discountPercent,
            ),
          ),
        );

        return transactionalEntityManager.save(cars);
      },
    );
  }
}
