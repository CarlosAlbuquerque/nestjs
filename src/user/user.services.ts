import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users = [
    {
      id: 1,
      userName: 'Carlos',
      email: 'carloshalbuquerque2@gmail.com',
      password: '12345',
      fullName: 'Carlos Henrique Albueurque',
      created_at: new Date(),
    },
  ];

  public create(user: User): User {
    this.users.push(user);
    return user;
  }

  public getByUserName(userName: string): User {
    return this.users.find((user) => user.userName == userName);
  }
}
