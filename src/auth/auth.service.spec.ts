import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authservice: AuthService;

  const mockAuthService = {
    signIn: jest.fn(() => {
      return {
        id: 1,
        fname: 'Mrugesh',
        lname: 'Patel',
        email: 'mrugesh@gmail.com',
        password: 'Mdp@8101988',
        createdDate: 1234567890,
        updatedDate: 1234567890,
        status: true,
      };
    }),
  };

  const CreateAuthDto = {
    email: 'mrugesh@gmail.com',
    password: 'Mdp@8101988',
  };

  const response = {
    id: 1,
    fname: 'Mrugesh',
    lname: 'Patel',
    email: 'mrugesh@gmail.com',
    password: 'Mdp@8101988',
    createdDate: 1234567890,
    updatedDate: 1234567890,
    status: true,
  };

  const mockUserRepo = {
    findOne: jest.fn().mockResolvedValue(response),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    authservice = await module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authservice).toBeDefined();
  });

  it('POST /signIn', () => {
    expect(authservice.signIn(CreateAuthDto)).toEqual(response);
  });

  it('POST /signIn error', async () => {
    mockUserRepo.findOne = jest.fn().mockRejectedValue({});
    expect(await authservice.signIn({ email: null, password: 'sfsd' })).toEqual(
      expect.any(Object),
    );
  });
});
