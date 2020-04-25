import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CarRepository } from '../repositories/car.repository';
import { EntityManager } from 'typeorm';
import { Car } from '../entities/car.entity';
import { CarDiscountCalculator } from '../car-discount-calculator.class';
import { Owner } from '../entities/owner.entity';
import { OwnerRepository } from '../repositories/owner.repository';
import {
  CAR_PERIOD_END_TO_APPLY_DISCOUNT_IN_MONTH,
  CAR_PERIOD_START_TO_APPLY_DISCOUNT_IN_MONTH,
  OWNERS_TO_DELETE_PERIOD_IN_MONTH,
} from '../constants';
import { SystemClockService } from './system-clock.service';

@Injectable()
export class CarMarketService {
  private readonly entityManager: EntityManager;
  private readonly carsRepository: CarRepository;
  private readonly ownersRepository: OwnerRepository;
  private readonly discountCalculator: CarDiscountCalculator;
  private readonly clockService: SystemClockService;

  constructor(
    @InjectEntityManager() entityManager: EntityManager,
    discountCalculator: CarDiscountCalculator,
    clockService: SystemClockService,
  ) {
    this.entityManager = entityManager;
    this.carsRepository = entityManager.getCustomRepository(CarRepository);
    this.ownersRepository = entityManager.getCustomRepository(OwnerRepository);
    this.discountCalculator = discountCalculator;
    this.clockService = clockService;
  }

  public async applyDiscountToCarsRegisteredInPeriod(): Promise<Car[]> {
    const date = new Date(this.clockService.getCurrentDate());
    const from = new Date(
      new Date(this.clockService.getCurrentDate()).setMonth(
        date.getMonth() - CAR_PERIOD_START_TO_APPLY_DISCOUNT_IN_MONTH,
      ),
    );
    const to = new Date(
      new Date(this.clockService.getCurrentDate()).setMonth(
        date.getMonth() - CAR_PERIOD_END_TO_APPLY_DISCOUNT_IN_MONTH,
      ),
    );

    const cars = await this.carsRepository.getCarsRegisteredInPeriod(from, to);

    return await this.entityManager.transaction<Car[]>(
      (transactionalEntityManager: EntityManager) => {
        cars.forEach(car =>
          car.applyDiscount(
            this.discountCalculator.calculatePercentDiscount(car.getPrice()),
          ),
        );

        return transactionalEntityManager.save(cars);
      },
    );
  }

  public async removeOwnersBoughtCarsBeforeDate(): Promise<Owner[]> {
    const date = new Date(this.clockService.getCurrentDate());
    const beforeDate = new Date(
      new Date(this.clockService.getCurrentDate()).setMonth(
        date.getMonth() - OWNERS_TO_DELETE_PERIOD_IN_MONTH,
      ),
    );

    const owners = await this.ownersRepository.findWithPurchaseDateBefore(
      beforeDate,
    );

    return await this.entityManager.transaction<Owner[]>(
      (transactionalEntityManager: EntityManager) => {
        return transactionalEntityManager.remove(owners);
      },
    );
  }
}
