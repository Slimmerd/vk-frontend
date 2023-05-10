import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class MsgDataDto {
  @IsNotEmpty()
  @IsInt()
  convID: number;

  @IsNotEmpty()
  @IsString()
  message: string;
}
