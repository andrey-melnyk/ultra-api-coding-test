import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CarCRUDService } from '../car-crud.service';
import { CarId } from '../types';
import { CreateCarDto } from '../dto/create-car.dto';

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

    return car.toDTO();
  }

  @Get(':id/manufacturer')
  public async getCarManufacturerByCarId(@Param('id') id: CarId) {
    const car = await this.carCRUDService.getCarById(id);

    if (!car) {
      throw new NotFoundException();
    }

    return car.toDTO().manufacturer;
  }

  @Post()
  public createCar() {
    const createCarDTO = new CreateCarDto();

    createCarDTO.price = 1000;
    createCarDTO.firstRegistrationDate = new Date('01-01-2008');
    createCarDTO.manufacturerId = '1';
    createCarDTO.ownerIds = ['1'];

    return this.carCRUDService.createNewCar(createCarDTO);
  }
}
