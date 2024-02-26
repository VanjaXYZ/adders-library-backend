import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
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
