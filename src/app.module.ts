import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarManagementModule } from './car-management/car-management.module';

@Module({
  imports: [CarManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
