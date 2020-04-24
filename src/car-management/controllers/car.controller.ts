import { Body, Controller, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { CarCRUDService } from '../car-crud.service';
import { CarId } from '../types';
import { CreateCarDto } from '../dto/create-car.dto';
import { DomainExceptionsFilter } from '../exceptions-filters/domain-exceptions.filter';
import { UpdateCarDTO } from '../dto/update-car.dto';

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
    const car = await this.carCRUDService.createNewCar(body);

    return car.toDTO();
  }

  @Put(':id')
  public async updateCar(@Param('id') id: CarId, @Body() body: UpdateCarDTO) {
    const car = await this.carCRUDService.updateCarById(id, body);

    return car.toDTO();
  }
}
