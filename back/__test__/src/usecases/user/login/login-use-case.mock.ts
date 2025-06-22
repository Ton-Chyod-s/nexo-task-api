import { vi } from 'vitest';
import bcrypt from 'bcrypt';
import { IUserRepository } from '../../../../../src/domain/repositories/user-repository';
import { AuthService } from '../../../../../src/infrastructure/jwt/auth-service';
import { faker } from '@faker-js/faker';

export const senha = 'senha123';
export const senhaErrada = 'outraSenha';

export const user = {
  id: '1',
  nome: faker.person.fullName(),
  email: faker.internet.email(),
  passwordHash: '',
};

export let mockUserRepository: IUserRepository;
export let mockAuthService: AuthService;

export async function setupMocks() {
  const senhaHash = await bcrypt.hash(senha, 10);
  user.passwordHash = senhaHash;

  mockUserRepository = {
    findByName: vi.fn().mockResolvedValue(user),
    create: vi.fn(),
    findByEmail: vi.fn(),
    save: vi.fn(),
    findByResetToken: vi.fn(),
  };

  mockAuthService = {
    generateToken: vi.fn().mockReturnValue('fake-jwt-token'),
    compareHash: vi.fn((senha, hash) => bcrypt.compare(senha, hash)),
  } as unknown as AuthService;
}
