import { CarDiscountCalculator } from './car-discount-calculator.class';

describe('Car discount calculator', () => {
  describe('Method calculatePercentDiscount', () => {
    const discountCalculator = new CarDiscountCalculator(20);

    it('test correct discount calculation', () => {
      const testArguments = [
        { carPrice: 500, expectedResult: 100 },
        { carPrice: 1000, expectedResult: 200 },
        { carPrice: 2000, expectedResult: 400 },
      ];

      for (const argument of testArguments) {
        expect(
          discountCalculator.calculatePercentDiscount(argument.carPrice),
        ).toEqual(argument.expectedResult);
      }
    });
  });
});
