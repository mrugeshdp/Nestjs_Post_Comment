import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/guards/getUser.guard';
import { User } from 'src/users/entities/user.entity';
import { Posts } from './entities/post.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('filePath', {
      dest: './upload',
    }),
  )
  create(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
    @UploadedFile() file: any,
  ): Promise<Posts> {
    return this.postService.create(createPostDto, user, file);
  }

  @Get()
  getAllPosts(): Promise<Posts[]> {
    return this.postService.getAllPosts();
  }

  @Get('/own')
  @UseGuards(AuthGuard('jwt'))
  getOwnPosts(@GetUser() user: User): Promise<Posts[]> {
    return this.postService.getOwnPosts(user);
  }

  @Get('/:id')
  getPostById(@Param('id') id: string): Promise<Posts> {
    return this.postService.getPostById(+id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  updatepost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: User,
  ): Promise<Posts> {
    return this.postService.updatePost(+id, updatePostDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deletePost(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.postService.deletePost(+id, user);
  }

  @Patch('/:id/like')
  @UseGuards(AuthGuard('jwt'))
  likePost(@Param('id') id: number, @GetUser() user: User): Promise<Posts> {
    return this.postService.likePost(+id, user);
  }
}
