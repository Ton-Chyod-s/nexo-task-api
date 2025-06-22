import { describe, it, expect, beforeEach } from 'vitest';
import { LoginUseCase } from '../../../../../src/usecases/user/login-use-case';
import {
  setupMocks,
  user,
  senha,
  senhaErrada,
  mockUserRepository,
  mockAuthService
} from './login-use-case.mock';

let loginUseCase: LoginUseCase;

describe('LoginUseCase', () => {
  beforeEach(async () => {
    await setupMocks(); 
    loginUseCase = new LoginUseCase(mockUserRepository, mockAuthService);
  });

  it('deve retornar token se as credenciais estiverem corretas', async () => {
    const result = await loginUseCase.execute('João', senha);

    expect(result).toEqual({
      id: String(user.id),
      nome: user.nome,
      email: user.email,
      token: 'fake-jwt-token',
    });

    expect(mockUserRepository.findByName).toHaveBeenCalledWith('João');
    expect(mockAuthService.generateToken).toHaveBeenCalledWith('1');
  });

  it('deve retornar null se o usuário não existir', async () => {
    (mockUserRepository.findByName as any).mockResolvedValue(null);

    const result = await loginUseCase.execute('Inexistente', senha);
    expect(result).toBeNull();
  });

  it('deve retornar null se a senha estiver incorreta', async () => {
    const result = await loginUseCase.execute('João', senhaErrada);
    expect(result).toBeNull();
  });
});
