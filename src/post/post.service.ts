import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
  ) {}
  async create(body: CreatePostDto, user: User, file: any): Promise<Posts> {
    const post = this.postRepository.create({
      postTitle: body.postTitle,
      postDescription: body.postDescription,
      user: user,
      filePath: file.filename,
    });

    await this.postRepository.save(post);
    return post;
  }

  getAllPosts(): Promise<Posts[]> {
    return this.postRepository.find();
  }

  getOwnPosts(user: User): Promise<Posts[]> {
    return this.postRepository.find({ user });
  }

  getPostById(id: number): Promise<Posts> {
    return this.postRepository.findOne({ id });
  }

  async updatePost(
    id: number,
    updatePostDto: UpdatePostDto,
    user: User,
  ): Promise<Posts> {
    try {
      const { postTitle, postDescription, postStatus } = updatePostDto;

      const found = await this.postRepository.findOne({ id, user });

      if (!found) {
        throw new NotFoundException(`The post with id: ${id} does not exist`);
      }

      if (postTitle) {
        found.postTitle = postTitle;
        found.updatedDate = new Date();
      }

      if (postDescription) {
        found.postDescription = postDescription;
        found.updatedDate = new Date();
      }

      if (postStatus) {
        found.postStatus = postStatus;
        found.updatedDate = new Date();
      }

      await this.postRepository.save(found);
      return found;
    } catch (error) {
      return error;
    }
  }

  async deletePost(id: number, user: User): Promise<void> {
    const deleted = await this.postRepository.delete({ id, user });

    if (deleted.affected === 0) {
      throw new NotFoundException(`The post with id ${id} does not exist`);
    }
  }

  async likePost(id: number, user: User): Promise<Posts> {
    const found = await this.postRepository.findOne({ id, user });

    if (!found) {
      throw new NotFoundException(`The post with id: ${id} does not exist`);
    }

    found.totalLike += 1;

    await this.postRepository.save(found);

    return found;
  }
}
