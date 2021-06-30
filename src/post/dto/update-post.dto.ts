import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  postTitle?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(100)
  postDescription?: string;

  @IsBoolean()
  postStatus?: boolean;
}
