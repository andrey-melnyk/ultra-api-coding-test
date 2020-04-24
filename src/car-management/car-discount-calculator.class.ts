import { Injectable } from '@nestjs/common';

@Injectable()
export class CarDiscountCalculator {
  public calculatePercentDiscount(carPrice: number, discountPercentage: number) {
    return carPrice * (discountPercentage / 100);
  }
}
