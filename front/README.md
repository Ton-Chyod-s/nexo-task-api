# NexoTask – Frontend

Interface web para o sistema de gerenciamento de tarefas NexoTask. Consome a [API NexoTask](../back) e foi desenvolvida com **React + TypeScript**, **Vite** e **Tailwind CSS**.

---

## Tecnologias

- **React + TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **Lucide React**
- **Vercel** (produção)

---

## Funcionalidades

- Cadastro e login de usuários
- Recuperação e redefinição de senha por e-mail
- Criação, edição, exclusão e visualização de tarefas
- Filtros por cor, prioridade e data
- Marcação de tarefas favoritas
- Seleção de cor por tarefa
- Interface responsiva

---

## Instalação Local

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:3001`

### Variáveis de Ambiente

Crie um arquivo `.env` em `front/`:

```env
VITE_PORT=3001
VITE_API_URL=http://localhost:5050
```

> Em produção (Vercel), defina `VITE_API_URL` com a URL do backend no Fly.io.

---

## Estrutura

```
src/
├── assets/        # Estilos e imagens
├── components/    # Componentes reutilizáveis
├── pages/         # Páginas (Login, Register, Dashboard, etc.)
├── routes/        # Configuração de rotas
└── utils/
    ├── api.ts     # URL base da API (via VITE_API_URL)
    └── FormatDate.ts
```

---

## Deploy (Vercel)

Conecte o repositório no [Vercel](https://vercel.com), defina o diretório raiz como `front/` e adicione a variável de ambiente:

```env
VITE_API_URL=https://<seu-app>.fly.dev
```

---

## Licença

MIT
