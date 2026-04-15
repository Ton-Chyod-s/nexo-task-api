# NexoTask – Backend

API RESTful para gerenciamento de tarefas, construída com **Node.js + TypeScript**, seguindo os princípios da **Clean Architecture**.

---

## Tecnologias

- **Node.js + TypeScript**
- **Express 5**
- **Prisma ORM** + **PostgreSQL**
- **JWT** – autenticação stateless
- **Nodemailer** – envio de e-mails
- **Vitest** – testes unitários
- **Docker** + **Fly.io** (produção)

---

## Arquitetura

Organizado em camadas com Clean Architecture:

```
src/
├── domain/           # Entidades, DTOs e interfaces de repositório
├── usecases/         # Lógica de negócio
├── interfaces/       # Controllers, middlewares, rotas e docs Swagger
├── infrastructure/   # Implementações (Prisma, JWT, Nodemailer)
└── main/             # Servidor e configuração
```

---

## Instalação Local

### Sem Docker

```bash
npm install
npx prisma migrate dev
npm run dev
```

Servidor disponível em `http://localhost:5050`

### Com Docker

```bash
# Na raiz do projeto
docker-compose up -d --build
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` em `back/`:

```env
JWT_SECRET_KEY=sua_chave_secreta

DATABASE_URL=postgresql://postgres:123@localhost:5432/nexoTaskApi
DATABASE_URL_PROD=postgresql://postgres:123@localhost:5432/nexoTaskApi

PORT=5050
PORT_FRONT=3001

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
PORT_SERVER=1000
SMTP_USER=exemplo@gmail.com
SMTP_PASSWORD=senha_de_app_gmail
```

> Em produção, as variáveis são configuradas via `flyctl secrets set` — o arquivo `.env` não é incluído na imagem Docker.

---

## Deploy (Fly.io)

```bash
flyctl launch --no-deploy
flyctl secrets set DATABASE_URL="..." JWT_SECRET_KEY="..." SMTP_USER="..." SMTP_PASSWORD="..."
flyctl deploy
```

---

## Testes

```bash
npm run test
npm run test:coverage
```

---

## Documentação da API

Com o servidor rodando, acesse `http://localhost:5050` para visualizar a documentação Swagger.

Para mais detalhes sobre as rotas, consulte [`docs/routes.md`](./docs/routes.md).

---

## Licença

MIT
