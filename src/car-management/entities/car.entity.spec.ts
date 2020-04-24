import { Car } from './car.entity';
import { Manufacturer } from './manufacturer.entity';
import { Owner } from './owner.entity';
import { InvalidPriceException } from '../exceptions/invalid-price.exception';
import { InvalidFirstRegistrationDateException } from '../exceptions/invalid-first-registration-date.exception';

describe('Car entity', () => {
  const testManufacturer = new Manufacturer();
  const testOwner = new Owner();
  const car = Car.createNew(1000, new Date('01-01-2009'), testManufacturer, [
    testOwner,
  ]);

  describe('CreateNew factory method', () => {
    it('pass incorrect price to constructor - should throw InvalidPriceException', () => {
      expect(() =>
        Car.createNew(-1000, new Date('01-01-2009'), testManufacturer, []),
      ).toThrowError(InvalidPriceException);
    });

    it('pass incorrect firstRegistrationDate - should throw ', () => {
      expect(() =>
        Car.createNew(1000, new Date('01-01-2028'), testManufacturer, []),
      ).toThrowError(InvalidFirstRegistrationDateException);
    });

    it('pass correct params - should return Car instance', () => {
      const car = Car.createNew(
        1000,
        new Date('01-01-2009'),
        testManufacturer,
        [],
      );

      expect(car).toBeInstanceOf(Car);
    });
  });

  describe('Method updatePrice', () => {
    it('set correct price - should set price to new value', () => {
      const newPrice = 123;

      car.updatePrice(newPrice);

      expect(car.toDTO().price).toEqual(newPrice);
    });

    it('set incorrect price - should throw InvalidPriceException', () => {
      const newPrice = -123;

      expect(() => car.updatePrice(newPrice)).toThrowError(
        InvalidPriceException,
      );
    });
  });
});
