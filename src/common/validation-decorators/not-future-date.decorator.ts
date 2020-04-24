import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function NotFutureDate(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'notFutureDate',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const date = new Date();
          date.setDate(new Date().getDate());
          date.setHours(0, 0, 0, 0);

          return date >= new Date(value);
        },
      },
    });
  };
}
