import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemClockService {
  public getCurrentDate(): Date {
    return new Date();
  }
}
