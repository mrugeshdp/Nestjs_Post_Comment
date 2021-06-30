import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreatePostCommentDto } from './create-post-comment.dto';

export class UpdatePostCommentDto extends PartialType(CreatePostCommentDto) {
  @IsString()
  @IsNotEmpty()
  commentText?: string;

  @IsBoolean()
  commentStatus?: boolean;
}
