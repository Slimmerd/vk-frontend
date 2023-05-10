import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteConvDataDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
