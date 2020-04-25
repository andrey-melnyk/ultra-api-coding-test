import { Car } from '../../../src/car-management/entities/car.entity';
import { Manufacturer } from '../../../src/car-management/entities/manufacturer.entity';
import { Owner } from '../../../src/car-management/entities/owner.entity';

export const manufacturersCollection: Manufacturer[] = [
  Manufacturer.createNew('BMW', '111-222-333', 123),
  Manufacturer.createNew('Audi', '222-222-222', 321),
  Manufacturer.createNew('Mercedes', '333-333-333', 222),
];

export const ownersCollection: Owner[] = [
  Owner.createNew('Name 1', new Date('01-01-2008')),
  Owner.createNew('Name 2', new Date('01-01-2020')),
  Owner.createNew('Name 3', new Date('01-01-2020')),
];

export const carsCollection: Car[] = [
  Car.createNew(10000, new Date('01-25-2019'), manufacturersCollection[0], [
    ownersCollection[1],
  ]),
  Car.createNew(10000, new Date('01-25-2019'), manufacturersCollection[0], [
    ownersCollection[0],
  ]),
  Car.createNew(10000, new Date('01-25-2020'), manufacturersCollection[0], [
    ownersCollection[1],
  ]),
  Car.createNew(10000, new Date('01-25-2020'), manufacturersCollection[0], [
    ownersCollection[0],
  ]),
];
