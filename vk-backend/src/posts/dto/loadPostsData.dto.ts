import { IsInt, IsNotEmpty } from 'class-validator';

export class LoadPostsDataDto {
  @IsNotEmpty()
  @IsInt()
  userID: number;

  @IsInt()
  skip?: number;
}
