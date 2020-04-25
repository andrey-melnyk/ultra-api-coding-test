import { INestApplication } from '@nestjs/common';
import { InitApplication } from '../../init-application.helper';
import * as request from 'supertest';
import { EntityManager } from 'typeorm';
import {
  carsCollection,
  manufacturersCollection,
  ownersCollection,
} from '../mocks/collections';
import { Manufacturer } from '../../../src/car-management/entities/manufacturer.entity';
import { Owner } from '../../../src/car-management/entities/owner.entity';
import { Car } from '../../../src/car-management/entities/car.entity';

describe('E2E API (GET) /cars/process', () => {
  let app: INestApplication;
  let entityManager: EntityManager;

  beforeAll(async () => {
    app = await InitApplication(new Date('04-25-2020'));

    entityManager = app.get(EntityManager);

    await entityManager
      .getRepository(Manufacturer)
      .save(manufacturersCollection);
    await entityManager.getRepository(Owner).save(ownersCollection);
    await entityManager.getRepository(Car).save(carsCollection);

    return true;
  });

  it('should run process', async () => {
    return request(app.getHttpServer())
      .get('/api/cars/process')
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveProperty('updatedCars');
        expect(res.body).toHaveProperty('removedOwners');

        expect(res.body.updatedCars).toContainEqual({
          id: carsCollection[0].toDTO().id,
          price: 8000,
          firstRegistrationDate: carsCollection[0]
            .toDTO()
            .firstRegistrationDate.toISOString(),
          manufacturer: JSON.parse(
            JSON.stringify(carsCollection[0].toDTO().manufacturer),
          ),
          owners: JSON.parse(JSON.stringify(carsCollection[0].toDTO().owners)),
        });

        expect(res.body.updatedCars).toContainEqual({
          id: carsCollection[1].toDTO().id,
          price: 8000,
          firstRegistrationDate: carsCollection[1]
            .toDTO()
            .firstRegistrationDate.toISOString(),
          manufacturer: JSON.parse(
            JSON.stringify(carsCollection[1].toDTO().manufacturer),
          ),
          owners: JSON.parse(JSON.stringify(carsCollection[1].toDTO().owners)),
        });

        expect(res.body.removedOwners).toContainEqual({
          name: ownersCollection[0].toDTO().name,
          purchaseDate: ownersCollection[0].toDTO().purchaseDate.toISOString(),
        });
      });
  });

  afterAll(async () => {
    await entityManager
      .getRepository(Car)
      .createQueryBuilder()
      .delete()
      .execute();
    await entityManager
      .getRepository(Manufacturer)
      .createQueryBuilder()
      .delete()
      .execute();
    await entityManager
      .getRepository(Owner)
      .createQueryBuilder()
      .delete()
      .execute();

    await entityManager.connection.close();
    return app.close();
  });
});
