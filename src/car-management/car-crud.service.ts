import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CarId } from './types';
import { Manufacturer } from './entities/manufacturer.entity';
import { Owner } from './entities/owner.entity';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarCRUDService {
  private readonly carsRepository: Repository<Car>;
  private readonly manufacturersRepository: Repository<Manufacturer>;
  private readonly ownersRepository: Repository<Owner>;

  constructor(
    @InjectRepository(Car)
    carsRepository: Repository<Car>,
    @InjectRepository(Manufacturer)
    manufacturersRepository: Repository<Manufacturer>,
    @InjectRepository(Owner)
    ownersRepository: Repository<Owner>,
  ) {
    this.carsRepository = carsRepository;
    this.manufacturersRepository = manufacturersRepository;
    this.ownersRepository = ownersRepository;
  }

  public async getCarsList(): Promise<Car[]> {
    return this.carsRepository.find();
  }

  public async getCarById(id: CarId): Promise<Car | undefined> {
    return this.carsRepository.findOne({ where: { id } });
  }

  public async createNewCar(createCarDTO: CreateCarDto): Promise<Car> {
    const manufacturer = this.manufacturersRepository.findOne({
      where: { id: createCarDTO.manufacturerId },
    });
    const owners = this.ownersRepository.find({
      where: { id: In(createCarDTO.ownerIds) },
    });

    const car = Car.createNew(
      createCarDTO.price,
      createCarDTO.firstRegistrationDate,
      await manufacturer,
      await owners,
    );

    return this.carsRepository.save(car);
  }
}
