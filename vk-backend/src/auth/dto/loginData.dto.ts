import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDataDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
