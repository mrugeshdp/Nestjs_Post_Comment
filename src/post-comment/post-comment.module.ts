import { Module } from '@nestjs/common';
import { PostCommentService } from './post-comment.service';
import { PostCommentController } from './post-comment.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PostModule } from 'src/post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostComment } from './entities/post-comment.entity';

@Module({
  imports: [AuthModule, PostModule, TypeOrmModule.forFeature([PostComment])],
  controllers: [PostCommentController],
  providers: [PostCommentService],
})
export class PostCommentModule {}
