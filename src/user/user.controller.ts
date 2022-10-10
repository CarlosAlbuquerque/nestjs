import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response-builders';
import { User } from './user.entity';
import { UserService } from './user.services';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userName')
  public getByUserName(@Param('userName') userName: string) {
    const user = this.userService.getByUserName(userName);

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found!',
      });
    }
    return user;
  }

  @Post()
  public create(@Body() user: User): NestResponse {
    const userCreated = this.userService.create(user);
    return new NestResponseBuilder()
      .status(HttpStatus.CREATED)
      .headers({
        Location: `/users/${userCreated.userName}`,
      })
      .body(userCreated)
      .build();
  }
}
