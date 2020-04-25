import { Inject, Injectable } from '@nestjs/common';
import { DISCOUNT_PERCENT } from './constants';

@Injectable()
export class CarDiscountCalculator {
  private readonly discountPercent: number;

  constructor(@Inject(DISCOUNT_PERCENT) discountPercent: number) {
    this.discountPercent = discountPercent;
  }

  public calculatePercentDiscount(carPrice: number) {
    return carPrice * (this.discountPercent / 100);
  }
}
