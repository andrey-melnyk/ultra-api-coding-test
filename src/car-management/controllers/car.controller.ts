import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { CarCRUDService } from '../services/car-crud.service';
import { CarId } from '../types';
import { CreateCarDto } from '../dto/create-car.dto';
import { DomainExceptionsFilter } from '../exceptions-filters/domain-exceptions.filter';
import { UpdateCarDTO } from '../dto/update-car.dto';
import { Car } from '../entities/car.entity';
import { CarMarketService } from '../services/car-market.service';
import { Owner } from '../entities/owner.entity';

@UseFilters(DomainExceptionsFilter)
@Controller('/api/cars')
export class CarController {
  private readonly carCRUDService: CarCRUDService;
  private readonly carMarketService: CarMarketService;

  constructor(
    carCrudService: CarCRUDService,
    carMarketService: CarMarketService,
  ) {
    this.carCRUDService = carCrudService;
    this.carMarketService = carMarketService;
  }

  @Get('/process')
  public async triggerProcess() {
    const date = new Date();
    const from = new Date(new Date().setMonth(date.getMonth() - 18));
    const to = new Date(new Date().setMonth(date.getMonth() - 12));
    const discount = 20;
    const updatedCars = this.carMarketService.applyDiscountToCarsRegisteredInPeriod(
      from,
      to,
      discount,
    );

    const beforeDate = new Date(new Date().setMonth(date.getMonth() - 18));
    const removedOwners = this.carMarketService.removeOwnersBoughtCarsBeforeDate(
      beforeDate,
    );

    return {
      updatedCars: (await updatedCars).map((car: Car) => car.toDTO()),
      removedOwners: (await removedOwners).map((owner: Owner) => owner.toDTO()),
    };
  }

  @Get()
  public async getCarsList() {
    return (await this.carCRUDService.getCarsList()).map((car: Car) =>
      car.toDTO(),
    );
  }

  @Get(':id')
  public async getCarById(@Param('id') id: CarId) {
    const car = await this.carCRUDService.getCarById(id);

    return car.toDTO();
  }

  @Get(':id/manufacturer')
  public async getCarManufacturerByCarId(@Param('id') id: CarId) {
    const car = await this.carCRUDService.getCarById(id);

    return car.toDTO().manufacturer;
  }

  @Post()
  public async createCar(@Body() body: CreateCarDto) {
    const car = await this.carCRUDService.createNewCar(body);

    return car.toDTO();
  }

  @Put(':id')
  public async updateCar(@Param('id') id: CarId, @Body() body: UpdateCarDTO) {
    const car = await this.carCRUDService.updateCarById(id, body);

    return car.toDTO();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteCar(@Param('id') id: CarId) {
    await this.carCRUDService.deleteCarById(id);
  }
}
