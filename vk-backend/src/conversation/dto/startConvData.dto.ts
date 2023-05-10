import { IsInt, IsNotEmpty } from 'class-validator';

export class StartConvDataDto {
  @IsNotEmpty()
  @IsInt()
  friendID: number;
}
