import { vi } from 'vitest';
const { faker } = require('@faker-js/faker');
import { IUserRepository } from '../../../../../src/domain/repositories/user-repository';
import { User } from '../../../../../src/domain/entities/user';
import bcrypt from 'bcrypt';

const password = faker.internet.password();
const saltRounds = 10;

const hash = await bcrypt.hash(password, saltRounds);

export const mockUser: User = {
  id: faker.string.uuid(),
  nome: faker.person.fullName(),
  email: faker.internet.email(),
  passwordHash: hash,
};

export const mockUserRepository: IUserRepository = {
  create: vi.fn().mockResolvedValue(mockUser),
  findByName: vi.fn(),
  findByEmail: vi.fn(),
  save: vi.fn(),
  findByResetToken: vi.fn(),
};
