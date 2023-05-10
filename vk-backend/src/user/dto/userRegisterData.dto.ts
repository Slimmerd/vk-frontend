import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserRegisterDataDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  edu?: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dob: Date;

  @IsNotEmpty()
  @IsString()
  city: string;
}
