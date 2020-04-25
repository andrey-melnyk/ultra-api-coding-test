import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InvalidFirstRegistrationDateException } from '../exceptions/invalid-first-registration-date.exception';
import { InvalidPriceException } from '../exceptions/invalid-price.exception';
import { EntityNotFoundException } from '../exceptions/entity-not-found.exception';
import { InvalidDiscountException } from '../exceptions/invalid-discount.exception';

@Catch()
export class DomainExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): any {
    if (exception instanceof InvalidFirstRegistrationDateException) {
      return super.catch(
        new BadRequestException('Invalid first registration date'),
        host,
      );
    }

    if (exception instanceof InvalidPriceException) {
      return super.catch(new BadRequestException('Invalid price'), host);
    }

    if (exception instanceof InvalidDiscountException) {
      return super.catch(new BadRequestException('Invalid discount'), host);
    }

    if (exception instanceof EntityNotFoundException) {
      return super.catch(new NotFoundException(exception.message), host);
    }

    return super.catch(exception, host);
  }
}
