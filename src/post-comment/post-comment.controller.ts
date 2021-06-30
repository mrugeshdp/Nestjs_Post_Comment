import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostCommentService } from './post-comment.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
import { GetUser } from 'src/auth/guards/getUser.guard';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { PostComment } from './entities/post-comment.entity';

@Controller('post-comment')
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createComment(
    @Body() bodyData: CreatePostCommentDto,
    @GetUser() user: User,
  ): Promise<any> {
    return this.postCommentService.createComment(bodyData, user);
  }

  @Get()
  getAllComments(): Promise<PostComment[]> {
    return this.postCommentService.getAllComments();
  }

  @Get('/:id')
  getAllCommentsByPost(@Param('id') id: string): Promise<PostComment[]> {
    return this.postCommentService.getAllCommentsByPost(+id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  updateComment(
    @Param('id') id: string,
    @Body() bodyData: UpdatePostCommentDto,
    @GetUser() user: User,
  ) {
    return this.postCommentService.updateComment(+id, bodyData, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteComment(@Param('id') id: string, @GetUser() user: User) {
    return this.postCommentService.deleteComment(+id, user);
  }
}
