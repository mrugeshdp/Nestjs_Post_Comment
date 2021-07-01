import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository;

  const CreateUserDto = {
    fname: 'Mrugesh',
    lname: 'Patel',
    email: 'mrugesh8@gmail.com',
    password: 'Mdp@0810',
  };

  const response = {
    fname: 'Mrugesh',
    lname: 'Patel',
    email: 'mrugesh81@gmail.com',
    password: 'Mdp@0810',
    createdDate: new Date(),
    updatedDate: new Date(),
    status: true,
    id: 8,
  };

  const mockUserRepo = {
    create: jest.fn().mockResolvedValue(response),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserRepo },
      ],
    }).compile();

    userService = await module.get<UsersService>(UsersService);
    userRepository = await module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userService.create).toBeDefined();
  });

  describe('Create User', () => {
    it('POST /Create user', async () => {
      expect(await userService.create(CreateUserDto)).toEqual(response);
    });
  });
});
