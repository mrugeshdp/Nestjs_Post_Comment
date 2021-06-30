import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/post/entities/post.entity';
import { PostService } from 'src/post/post.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
import { PostComment } from './entities/post-comment.entity';

@Injectable()
export class PostCommentService {
  constructor(
    @InjectRepository(PostComment)
    private postCommentRepository: Repository<PostComment>,
    private postService: PostService,
  ) {}

  async createComment(bodyData: CreatePostCommentDto, user: User) {
    const postComment = new PostComment();
    const post = new Posts();

    post.id = bodyData.postId;
    postComment.post = post;
    postComment.user = user;
    postComment.commentText = bodyData.commentText;
    const response = await this.postCommentRepository.save(postComment);
    console.log(response);
  }

  getAllComments(): Promise<PostComment[]> {
    return this.postCommentRepository.find();
  }

  getAllCommentsByPost(id: number): Promise<PostComment[]> {
    const found = this.postCommentRepository.find({
      where: { post: id },
    });

    if (!found) {
      throw new NotFoundException(`The post is not found`);
    }
    return found;
  }

  findOne(id: number) {
    return `This action returns a #${id} postComment`;
  }

  async updateComment(id: number, bodyData: UpdatePostCommentDto, user: User) {
    const { commentText, commentStatus } = bodyData;

    const found = await this.postCommentRepository.findOne({ id, user });

    if (!found) {
      throw new NotFoundException("You haven't commented anything");
    }

    if (commentText) {
      found.commentText = commentText;
      found.updatedDate = new Date();
    }

    if (commentStatus) {
      found.commentStatus = commentStatus;
      found.updatedDate = new Date();
    }

    await this.postCommentRepository.save(found);
    return found;
  }

  async deleteComment(id: number, user: User) {
    // const postUser = await this.postCommentRepository
    //   .createQueryBuilder()
    //   .select('p.userId')
    //   .from(Posts, 'p')
    //   .innerJoin(PostComment, 'pc', 'p.id = pc.postId')
    //   .where('pc.id = :id', { id })
    //   .execute();

    const query = this.postCommentRepository.createQueryBuilder('pc');
    query.select('p.userId');
    query.innerJoin(Posts, 'p', 'pc.postId = p.id');
    query.where('pc.id = :id', { id });
    const result = await query.getRawMany();

    const commentUser = await this.postCommentRepository.findOne({ id, user });
    let deleted = null;
    if (result && result[0].userId == user.id) {
      deleted = await this.postCommentRepository.delete({ id });
    } else if (commentUser) {
      deleted = await this.postCommentRepository.delete({ id, user });
      if (deleted.affected === 0) {
        throw new NotFoundException(`The comment id ${id} not found`);
      }
    } else {
      throw new UnauthorizedException(
        `You are not authorized to delete this comment`,
      );
    }
  }
}
