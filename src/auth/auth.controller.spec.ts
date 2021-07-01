import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const CreateAuthDto = {
    email: 'mrugesh@gmail.com',
    password: 'Mdp@8101988',
  };

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('signIn user', () => {
    expect(controller.signIn(CreateAuthDto)).toEqual(response);
  });
});
