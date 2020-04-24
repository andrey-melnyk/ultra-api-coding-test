import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Car } from './entities/car.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CarId } from './types';
import { CreateCarDto } from './dto/create-car.dto';
import { CarRepository } from './repositories/car.repository';
import { ManufacturerRepository } from './repositories/manufacturer.repository';
import { OwnerRepository } from './repositories/owner.repository';
import { UpdateCarDTO } from './dto/update-car.dto';

@Injectable()
export class CarCRUDService {
  private readonly entityManager: EntityManager;
  private readonly carsRepository: CarRepository;
  private readonly manufacturersRepository: ManufacturerRepository;
  private readonly ownersRepository: OwnerRepository;

  constructor(@InjectEntityManager() entityManager: EntityManager) {
    this.entityManager = entityManager;
    this.carsRepository = entityManager.getCustomRepository(CarRepository);
    this.manufacturersRepository = entityManager.getCustomRepository(
      ManufacturerRepository,
    );
    this.ownersRepository = entityManager.getCustomRepository(OwnerRepository);
  }

  public async getCarsList(): Promise<Car[]> {
    return this.carsRepository.getAll();
  }

  public async getCarById(id: CarId): Promise<Car | undefined> {
    return this.carsRepository.findById(id);
  }

  public async createNewCar(createCarDTO: CreateCarDto): Promise<Car> {
    const manufacturer = await this.manufacturersRepository.findById(
      createCarDTO.manufacturerId,
    );
    const owners = await this.ownersRepository.findByIdsArray(
      createCarDTO.ownerIds,
    );

    const car = Car.createNew(
      createCarDTO.price,
      createCarDTO.firstRegistrationDate,
      manufacturer,
      owners,
    );

    return this.carsRepository.save(car);
  }

  public async updateCarById(id: CarId, updateCarDTO: UpdateCarDTO): Promise<Car> {
    const car = await this.carsRepository.findById(id);

    const owners = await this.ownersRepository.findByIdsArray(
      updateCarDTO.ownerIds,
    );

    car.updatePrice(updateCarDTO.price);
    car.updateOwnersList(owners);

    return this.carsRepository.save(car);
  }
}
