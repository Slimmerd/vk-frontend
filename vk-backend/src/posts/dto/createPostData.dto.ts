import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDataDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];
}
