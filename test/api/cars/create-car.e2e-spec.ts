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

describe('E2E API (POST) /cars', () => {
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

  it('should create car', async () => {
    return request(app.getHttpServer())
      .post('/api/cars')
      .send({
        price: 1000,
        firstRegistrationDate: '01-01-2008',
        manufacturerId: manufacturersCollection[2].toDTO().id,
        ownerIds: [ownersCollection[2].toDTO().id],
      })
      .expect(201)
      .expect(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          price: 1000,
          firstRegistrationDate: new Date('01-01-2008').toISOString(),
          manufacturer: JSON.parse(
            JSON.stringify(manufacturersCollection[2].toDTO()),
          ),
          owners: [JSON.parse(JSON.stringify(ownersCollection[2].toDTO()))],
        });
      });
  });

  it('should fail with 400', async () => {
    return request(app.getHttpServer())
      .post('/api/cars')
      .send({
        price: -100,
        firstRegistrationDate: '01-01-2022',
        manufacturerId: manufacturersCollection[2].toDTO().id,
        ownerIds: [ownersCollection[2].toDTO().id],
      })
      .expect(400);
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
