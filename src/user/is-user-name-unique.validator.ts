/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from './user.services';

@Injectable()
@ValidatorConstraint()
export class IsUserNameUniqueConstraint
  implements ValidatorConstraintInterface
{
  constructor(private userService: UserService) {}

  validate(userName: string): boolean {
    return !!!this.userService.getByUserName(userName);
  }
}

export function IsUserNameUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserNameUniqueConstraint,
    });
  };
}
