import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  author: string;
}
