import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const CreateUserDto = {
    fname: 'Mrugesh',
    lname: 'Patel',
    email: 'mrugesh8@gmail.com',
    password: 'Mdp@0810',
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  const mockUserService = {
    create: jest.fn(),
  };

  const response = {
    fname: 'Mrugesh',
    lname: 'Patel',
    email: 'mrugesh8@gmail.com',
    password: 'Mdp@0810',
    createdDate: new Date(),
    updatedDate: new Date(),
    id: 8,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('POST /signup', async () => {
    mockUserService.create.mockResolvedValue(response);
    expect(await controller.create(CreateUserDto)).toEqual(response);
  });
});
