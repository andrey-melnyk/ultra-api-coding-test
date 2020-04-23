import { Car } from './car.entity';
import { Manufacturer } from './manufacturer.entity';
import { Owner } from './owner.entity';

describe('Car entity', () => {
  const testManufacturer = new Manufacturer();
  const testOwner = new Owner();
  const car = new Car(testManufacturer, 1000, new Date('01-01-2009'), [
    testOwner,
  ]);

  describe('Constructor', () => {
    it('should set price to 0 instead of passed negative price', () => {
      const testCar = new Car(
        testManufacturer,
        -1000,
        new Date('01-01-2009'),
        [],
      );

      expect(testCar.getPrice()).toEqual(0);
    });

    it('should set firstRegistrationDate to current date instead of passed future date', () => {
      const testCar = new Car(
        testManufacturer,
        -1000,
        new Date('01-01-2028'),
        [],
      );

      expect(testCar.getFirstRegistrationDate()).toEqual(new Date());
    });
  });

  describe('Method updatePrice', () => {
    it('set correct price - should set price to new value', () => {
      const newPrice = 123;

      car.updatePrice(newPrice);

      expect(car.getPrice()).toEqual(newPrice);
    });

    it('set correct price', () => {
      const newPrice = -123;

      car.updatePrice(newPrice);

      expect(car.getPrice()).toEqual(0);
    });
  });
});
