import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userService: Partial<UserService>;

  beforeEach(async () => {
    // Mock de UserService
    userService = {
      findByEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validateUser returns user when password is correct', async () => {
    const password = '123456';
    const hashedPassword = await bcrypt.hash(password, 10);

    (userService.findByEmail as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: hashedPassword,
    });

    const user = await service.validateUser('test@example.com', password);
    expect(user).toBeDefined();
    expect(user!.email).toBe('test@example.com');
  });

  it('validateUser returns null when password is incorrect', async () => {
    const password = '123456';
    const hashedPassword = await bcrypt.hash(password, 10);

    (userService.findByEmail as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: hashedPassword,
    });

    const user = await service.validateUser('test@example.com', 'wrongpassword');
    expect(user).toBeNull();
  });

  it('login throws UnauthorizedException if user is invalid', async () => {
    (userService.findByEmail as jest.Mock).mockResolvedValue(null);

    await expect(
      service.login({ email: 'notfound@example.com', password: '123' })
    ).rejects.toThrow(UnauthorizedException);
  });
});
