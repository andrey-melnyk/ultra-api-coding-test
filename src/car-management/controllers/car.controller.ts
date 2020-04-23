import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CarCRUDService } from '../car-crud.service';
import { CarId } from '../types';

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

    if (!car) {
      throw new NotFoundException();
    }

    return car;
  }

  @Get(':id/manufacturer')
  public async getCarManufacturerByCarId(@Param('id') id: CarId) {
    const manufacturer = await this.carCRUDService.getCarManufacturerByCarId(
      id,
    );

    if (!manufacturer) {
      throw new NotFoundException();
    }

    return manufacturer;
  }

  @Post()
  public createCar() {
    return this.carCRUDService.createNewCar();
  }
}
