import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarManagementModule } from '../src/car-management/car-management.module';
import { Car } from '../src/car-management/entities/car.entity';
import { Manufacturer } from '../src/car-management/entities/manufacturer.entity';
import { Owner } from '../src/car-management/entities/owner.entity';
import { SystemClockService } from '../src/car-management/services/system-clock.service';

export const InitApplication = async (
  currentDate: Date,
): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          type: configService.get('DATABASE_TYPE'),
          host: configService.get('DATABASE_TEST_HOST'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASS'),
          database: configService.get('DATABASE_NAME'),
          synchronize: true,
          entities: [Car, Manufacturer, Owner],
        }),
        inject: [ConfigService],
      }),
      CarManagementModule,
    ],
  })
    .overrideProvider(SystemClockService)
    .useValue({
      getCurrentDate() {
        return currentDate;
      },
    })
    .compile();

  const app: INestApplication = moduleFixture.createNestApplication();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  return app.init();
};
