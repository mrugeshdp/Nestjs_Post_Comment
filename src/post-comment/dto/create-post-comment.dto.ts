import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreatePostCommentDto {
  @IsString()
  @MaxLength(100)
  commentText: string;

  @IsNumber()
  @IsNotEmpty()
  postId: number;
}
