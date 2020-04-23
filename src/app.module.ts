import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarManagementModule } from './car-management/car-management.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get('DATABASE_TYPE'),
        host: configService.get('DATABASE_HOST'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASS'),
        database: configService.get('DATABASE_NAME'),
        synchronize: true,
        entities: [
          'dist/**/*.entity{ .ts,.js}',
        ]
      }),
      inject: [ConfigService],
    }),
    CarManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
