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

describe('E2E API (GET) /cars/:id/manufacturer', () => {
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

  it('should get cars manufacturer', async () => {
    return request(app.getHttpServer())
      .get(`/api/cars/${carsCollection[0].toDTO().id}/manufacturer`)
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual(
          JSON.parse(JSON.stringify(carsCollection[0].toDTO().manufacturer)),
        );
      });
  });

  it('should fail with 404', async () => {
    return request(app.getHttpServer())
      .get('/api/cars/non-existing-car-id/manufacturer')
      .expect(404);
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
