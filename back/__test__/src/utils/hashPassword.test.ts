import { describe, it, expect } from 'vitest';
import { hashPassword } from '../../../../src/utils/password-generator'; // Ajuste o caminho conforme necessário
import bcrypt from 'bcrypt';

describe('hashPassword', () => {
  it('deve retornar um hash válido para a senha fornecida', async () => {
    const senhaOriginal = 'minhaSenha123';
    const hash = await hashPassword(senhaOriginal);

    // Verifica se é uma string e se o hash bate com a senha original
    expect(typeof hash).toBe('string');
    const corresponde = await bcrypt.compare(senhaOriginal, hash);
    expect(corresponde).toBe(true);
  });
});
