# Como Criar uma Nova Rota na API EX: Tarefa

## Estrutura do Projeto

```psql
src/
├── domain/
│   └── entities/
│       └── task.ts                     ← Define a entidade `Tarefas`
│
├── usecases/
│   └── task/
│       └── create-use-case.ts     ← Lógica para criar a tarefa
│
├── interfaces/
│   ├── controllers/
│       └── task/
│       |    └── create-controller.ts     ← Controller que chama o usecase
│       └── http/
|            └── routes.ts     ← definição das rotas
|           
├── infrastructure/
│   └── repositories/
│       └── task-repositoriy.ts          ← Implementação real do repositório
│
├── main/
|     └── server.ts     ← inicialização servidor
```

## 1. Criando a rota com requisito de autenticação `authenticateToken`

**Arquivo:** `./interfaces/http/routes.js`

```ts
router.post('/task', authenticateToken, async (req, res) => {
    await CreateTaskController.create(req, res);
});
```

## 2. Criando o controller

**Arquivo:** `./interfaces/controllers/task/create-controller.ts`

```js
export class CreateTaskController {
    static async create(req: Request, res: Response) {

    }
}
```

## 3. Criando repositories e interface

**Arquivo:** `./infrastructure/repositories/task-repositories.ts`

```ts
const prisma = new PrismaClient();

export class PrismaTaskRepository implements ITaskRepository{

}
```

**Arquivo:** `./domain/repositories/task-repositories.ts`

```ts
export interface ITaskRepository {
    create(task: CreateTaskDTO): Promise<Tarefa>;
}
```

## 4. Criando use case, injetando a interface do repositories e criando DTO para organização

**Arquivo:** `./usecases/task/create-use-case.ts`

```ts
export class CreateTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(task: CreateTaskDTO): Promise<Task> {

    }
}
```

**Arquivo:** `./domain/dtos/create-task-dto.ts`

```ts
import { Prioridade } from '@prisma/client';
  
export type CreateTaskDTO = {
    titulo: string;
    descricao?: string | null;
    status: boolean
    usuarioId: number;
    dataPrevista: Date;
    prioridade: Prioridade; 
};
```

## 5. Testes Unitários

Para garantir que o comportamento da regra de negócio está funcionando corretamente, crie testes unitários diretamente no use case, isolando o repositório real com um mock.

**Arquivo:** __tests__/src/usecases/task

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateTaskUseCase } from '../src/usecases/task/create-use-case';
import { ITaskRepository } from '../src/domain/repositories/task-repository';
import { CreateTaskDTO } from '../src/domain/dtos/create-task-dto';
import { Prioridade } from '@prisma/client';

describe('CreateTaskUseCase', () => {
  let taskRepositoryMock: ITaskRepository;
  let useCase: CreateTaskUseCase;

  beforeEach(() => {
    taskRepositoryMock = {
      create: vi.fn(async (data: CreateTaskDTO) => ({
        ...data,
        id: 1
      }))
    };
    useCase = new CreateTaskUseCase(taskRepositoryMock);
  });

  it('deve criar uma nova tarefa com sucesso', async () => {
    const input: CreateTaskDTO = {
      titulo: 'Estudar Vitest',
      descricao: 'Aprender testes com Vitest',
      status: false,
      usuarioId: 123,
      dataPrevista: new Date(),
      prioridade: Prioridade.MEDIA
    };

    const task = await useCase.execute(input);

    expect(task).toHaveProperty('id', 1);
    expect(task.titulo).toBe('Estudar Vitest');
    expect(taskRepositoryMock.create).toHaveBeenCalledOnce();
    expect(taskRepositoryMock.create).toHaveBeenCalledWith(input);
  });
});
```