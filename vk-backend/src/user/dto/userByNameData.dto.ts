import { IsNotEmpty, IsString } from 'class-validator';

export class UserByNameDataDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
