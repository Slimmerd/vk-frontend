import { IsInt, IsNotEmpty } from 'class-validator';

export class UserByIdDataDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
