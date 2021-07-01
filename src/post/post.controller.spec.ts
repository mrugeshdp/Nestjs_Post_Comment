import { Test, TestingModule } from '@nestjs/testing';
import { error } from 'console';
import { SaveOptions, RemoveOptions } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
  let controller: PostController;

  const mockPostService = {
    getAllPosts: jest.fn(),
    getOwnPosts: jest.fn(),
    getPostById: jest.fn(),
    updatePost: jest.fn(),
  };

  const mockUser: User = {
    fname: 'Mrugesh',
    lname: 'Patel',
    email: 'mrugesh81@gmail.com',
    password: 'Mdp@0810',
    createdDate: new Date(),
    updatedData: new Date(),
    status: true,
    id: 5,
    hasId: function (): boolean {
      throw new Error('Function not implemented.');
    },
    save: function (_options?: SaveOptions): Promise<any> {
      throw new Error('Function not implemented.');
    },
    remove: function (_options?: RemoveOptions): Promise<any> {
      throw new Error('Function not implemented.');
    },
    softRemove: function (_options?: SaveOptions): Promise<any> {
      throw new Error('Function not implemented.');
    },
    recover: function (_options?: SaveOptions): Promise<any> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
  };

  const response = {
    id: 5,
    user: mockUser,
    postTitle: 'New Post',
    postDescription: 'This is a testing Post',
    postStatus: true,
    createdDate: Date.now(),
    updatedDate: Date.now(),
    totalLike: 0,
    filePath: 'anything',
  };

  const updatePostDto = {
    postTitle: null,
    postDescription: null,
    postStatus: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
    })
      .overrideProvider(PostService)
      .useValue(mockPostService)
      .compile();

    controller = await module.get<PostController>(PostController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
    expect(await controller.getAllPosts).toBeDefined();
    expect(await controller.getOwnPosts).toBeDefined();
    expect(await controller.getPostById).toBeDefined();
    expect(await controller.updatePost).toBeDefined();
  });

  describe('Get Posts', () => {
    it('@GET /posts', async () => {
      mockPostService.getAllPosts.mockResolvedValue({ ...response });
      expect(await controller.getAllPosts()).toEqual({ ...response });
    });

    it('@GET /Own posts', async () => {
      mockPostService.getOwnPosts.mockResolvedValue({ ...response });
      expect(await controller.getOwnPosts(mockUser)).toEqual({
        ...response,
      });
    });

    it('@GET /by id', async () => {
      mockPostService.getPostById.mockResolvedValue(response);
      expect(await controller.getPostById('5')).toEqual(response);
    });
  });

  describe('Update Post', () => {
    it('@PATCH /update post', async () => {
      mockPostService.updatePost.mockResolvedValue(response);
      expect(await controller.updatePost('5', updatePostDto, mockUser)).toEqual(
        response,
      );
    });

    it('@PATCH / if not found', async () => {
      mockPostService.updatePost.mockResolvedValue(
        `The post with id: 1000 does not exist`,
      );
      expect(
        await controller.updatePost('10000', updatePostDto, mockUser),
      ).toEqual(`The post with id: 1000 does not exist`);
    });

    it('@PATCH / if anexpected occurs', async () => {
      mockPostService.updatePost.mockResolvedValue(error);
      expect(await controller.updatePost('5', null, mockUser)).toEqual(error);
    });
  });
});
