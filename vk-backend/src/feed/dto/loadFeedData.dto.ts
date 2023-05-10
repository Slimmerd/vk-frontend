import { IsInt } from 'class-validator';

export class LoadFeedDataDto {
  @IsInt()
  skip?: number;
}
