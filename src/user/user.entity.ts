import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUserNameUnique } from './is-user-name-unique.validator';

class UserIncomingSTO {}

class UseOutcomingDTO {}

export class User {
  id: number;

  @IsUserNameUnique({
    message: 'userName is unique.',
  })
  @IsNotEmpty({
    message: 'userName is required.',
  })
  @IsString({
    message: 'userName must be a string.',
  })
  userName: string;

  @IsEmail(
    {},
    {
      message: 'Please provide a valid email.',
    },
  )
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  @IsNotEmpty({
    message: 'password is required.',
  })
  password: string;

  @IsNotEmpty({
    message: 'fullName is required',
  })
  fullName: string;
  created_at: Date;
}
