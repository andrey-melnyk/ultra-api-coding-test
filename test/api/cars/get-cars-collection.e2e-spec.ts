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

describe('E2E API (GET) /cars', () => {
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

  it('should return cars list', async () => {
    return request(app.getHttpServer())
      .get('/api/cars')
      .expect(200)
      .expect(res => {
        carsCollection.forEach(car => {
          expect(res.body).toContainEqual(
            JSON.parse(JSON.stringify(car.toDTO())),
          );
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
