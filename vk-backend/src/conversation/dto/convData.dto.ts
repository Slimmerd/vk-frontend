import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';
import { Optional } from '@nestjs/common';

export class ConvDataDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsInt()
  skip?: number;
}
