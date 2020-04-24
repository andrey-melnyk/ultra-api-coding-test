import {
  Body,
  Controller,
  Get,
  Param,
  Post, UseFilters,
} from '@nestjs/common';
import { CarCRUDService } from '../car-crud.service';
import { CarId } from '../types';
import { CreateCarDto } from '../dto/create-car.dto';
import { DomainExceptionsFilter } from '../exceptions-filters/domain-exceptions.filter';

@UseFilters(DomainExceptionsFilter)
@Controller('/api/cars')
export class CarController {
  private readonly carCRUDService: CarCRUDService;

  constructor(carCrudService: CarCRUDService) {
    this.carCRUDService = carCrudService;
  }

  @Get()
  public getCarsList() {
    return this.carCRUDService.getCarsList();
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
    return (await this.carCRUDService.createNewCar(body)).toDTO();
  }
}
