import { CarDiscountCalculator } from './car-discount-calculator.class';

describe('Car discount calculator', () => {
  describe('Method calculatePercentDiscount', () => {
    const discountCalculator = new CarDiscountCalculator();

    it('test correct discount calculation', () => {
      const testArguments = [
        { carPrice: 1000, discountPercent: 50, expectedResult: 500 },
        { carPrice: 1000, discountPercent: 20, expectedResult: 200 },
        { carPrice: 1000, discountPercent: 80, expectedResult: 800 },
        { carPrice: 1000, discountPercent: 30, expectedResult: 300 },
      ];

      for (let argument of testArguments) {
        expect(discountCalculator.calculatePercentDiscount(argument.carPrice, argument.discountPercent)).toEqual(argument.expectedResult);
      }
    });
  });
});
