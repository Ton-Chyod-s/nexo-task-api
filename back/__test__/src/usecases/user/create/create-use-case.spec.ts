import { describe, it, expect, vi } from 'vitest';
import { CreateUseCase } from '../../../../../src/usecases/user/create-use-case';
import { mockUser, mockUserRepository } from './create-use-case.mock';

describe('CreateUseCase', () => {
  it('deve criar um novo usuário utilizando o repositório', async () => {
    // Arrange
    const createUseCase = new CreateUseCase(mockUserRepository);

    // Act
    const resultado = await createUseCase.execute(mockUser);

    // Assert
    expect(mockUserRepository.create).toHaveBeenCalledWith(mockUser);
    expect(resultado).toEqual(mockUser);
  });

  it('não deve permitir criar um usuário com e-mail já existente', async () => {
    // Act
    const createUseCase = new CreateUseCase({
      ...mockUserRepository,
      findByEmail: vi.fn().mockResolvedValue(mockUser), 
    });

    // Assert
    await expect(() => createUseCase.execute(mockUser))
      .rejects
      .toThrowError('E-mail already registered');
  });

  it('deve lançar erro se o repositório falhar ao criar o usuário', async () => {
    // Act
    const createUseCase = new CreateUseCase({
      ...mockUserRepository,
      create: vi.fn().mockRejectedValue(new Error('Erro no banco')),
    });

    // Assert
    await expect(() => createUseCase.execute(mockUser))
      .rejects
      .toThrowError('Erro no banco');
  });

  it('deve lançar erro se o e-mail estiver vazio', async () => {
    // Arrange
    const createUseCase = new CreateUseCase(mockUserRepository);

    // Act
    const userInvalido = { ...mockUser, email: '' };

    // Assert
    await expect(() => createUseCase.execute(userInvalido))
      .rejects
      .toThrowError('E-mail required');
  });
});