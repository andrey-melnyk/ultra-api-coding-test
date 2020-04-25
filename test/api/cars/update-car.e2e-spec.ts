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

describe('E2E API (PUT) /cars', () => {
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

  it('should update car', async () => {
    return request(app.getHttpServer())
      .put(`/api/cars/${carsCollection[0].toDTO().id}`)
      .send({
        price: 1500,
        ownerIds: [ownersCollection[1].toDTO().id],
      })
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual({
          id: carsCollection[0].toDTO().id,
          price: 1500,
          firstRegistrationDate: carsCollection[0]
            .toDTO()
            .firstRegistrationDate.toISOString(),
          manufacturer: JSON.parse(
            JSON.stringify(carsCollection[0].toDTO().manufacturer),
          ),
          owners: JSON.parse(JSON.stringify(carsCollection[0].toDTO().owners)),
        });
      });
  });

  it('should fail with 400', async () => {
    return request(app.getHttpServer())
      .put(`/api/cars/${carsCollection[0].toDTO().id}`)
      .send({
        price: -100,
        ownerIds: [ownersCollection[2].toDTO().id],
      })
      .expect(400);
  });

  it('should fail with 404', async () => {
    return request(app.getHttpServer())
      .put('/api/cars/non-existing-car-id')
      .send({
        price: 1500,
        ownerIds: [ownersCollection[1].toDTO().id],
      })
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
