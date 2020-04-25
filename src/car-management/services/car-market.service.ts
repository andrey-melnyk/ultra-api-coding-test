import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CarRepository } from '../repositories/car.repository';
import { EntityManager } from 'typeorm';
import { Car } from '../entities/car.entity';
import { CarDiscountCalculator } from '../car-discount-calculator.class';
import { Owner } from '../entities/owner.entity';
import { OwnerRepository } from '../repositories/owner.repository';

@Injectable()
export class CarMarketService {
  private readonly entityManager: EntityManager;
  private readonly carsRepository: CarRepository;
  private readonly ownersRepository: OwnerRepository;
  private readonly discountCalculator: CarDiscountCalculator;

  constructor(
    @InjectEntityManager() entityManager: EntityManager,
    discountCalculator: CarDiscountCalculator,
  ) {
    this.entityManager = entityManager;
    this.carsRepository = entityManager.getCustomRepository(CarRepository);
    this.ownersRepository = entityManager.getCustomRepository(OwnerRepository);
    this.discountCalculator = discountCalculator;
  }

  public async applyDiscountToCarsRegisteredInPeriod(
    from: Date,
    to: Date,
    discountPercent: number,
  ): Promise<Car[]> {
    const cars = await this.carsRepository.getCarsRegisteredInPeriod(from, to);

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

  public async removeOwnersBoughtCarsBeforeDate(date: Date): Promise<Owner[]> {
    const owners = await this.ownersRepository.findWithPurchaseDateBefore(date);

    return await this.entityManager.transaction<Owner[]>(
      (transactionalEntityManager: EntityManager) => {
        return transactionalEntityManager.remove(owners);
      },
    );
  }
}
