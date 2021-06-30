import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  postTitle: string;

  @IsString()
  @MinLength(10)
  @MaxLength(100)
  postDescription: string;
}
