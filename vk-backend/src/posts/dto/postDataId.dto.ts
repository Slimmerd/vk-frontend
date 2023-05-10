import { IsInt, IsNotEmpty } from 'class-validator';

export class PostDataIdDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
