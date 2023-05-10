import { IsInt, IsNotEmpty } from 'class-validator';

export class FriendDataDto {
  @IsNotEmpty()
  @IsInt()
  friendID: number;
}
