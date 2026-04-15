# NexoTask – Sistema de Gerenciamento de Tarefas

O **NexoTask** é uma aplicação completa para gerenciamento de tarefas, composta por uma **API (Back-end)** e uma **interface web (Front-end)**. Oferece autenticação JWT, envio de e-mails, arquitetura limpa e deploy em produção.

---

### Interface do sistema

[Veja as imagens do frontend aqui](https://github.com/Ton-Chyod-s/nexo-task-api/tree/main/png)

---

## Tecnologias Utilizadas

### Backend
- **Node.js + TypeScript** – ambiente robusto e escalável
- **Express 5** – framework HTTP
- **Prisma ORM** – gerenciamento do banco de dados com migrations
- **PostgreSQL / Neon** – banco de dados relacional (serverless em produção)
- **JWT** – autenticação stateless
- **Nodemailer** – envio de e-mails (recuperação de senha)
- **Vitest** – testes unitários
- **Docker** – ambiente padronizado
- **Fly.io** – hospedagem em produção

### Frontend
- **React + TypeScript** – SPA com tipagem forte
- **Vite** – build rápido e eficiente
- **Tailwind CSS** – estilização responsiva
- **React Router** – controle de rotas
- **Lucide React** – ícones modernos
- **Vercel** – hospedagem em produção

---

## Estrutura do Projeto

```bash
nexo-task-api/
├── back/                 # Backend (Node.js, Clean Architecture)
│   ├── src/              # Código fonte
│   ├── prisma/           # Schema e migrations
│   ├── Dockerfile        # Imagem de produção
│   └── fly.toml          # Configuração Fly.io
├── front/                # Frontend (React + Vite)
│   ├── src/              # Código fonte
│   └── Dockerfile        # Imagem de produção
├── docker-compose.yml    # Orquestra front, back e banco (ambiente local)
└── .github/workflows/    # CI/CD (merge automatizado, PR template)
```

---

## Instalação Local

### Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado
- [Node.js](https://nodejs.org/) v22 ou superior

### 1. Clonar o repositório

```bash
git clone https://github.com/Ton-Chyod-s/nexo-task-api.git
cd nexo-task-api
```

### 2. Configurar variáveis de ambiente

**Backend** – crie `back/.env`:

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

**Frontend** – crie `front/.env`:

```env
VITE_PORT=3001
VITE_API_URL=http://localhost:5050
```

### 3. Subir com Docker

```bash
docker-compose up -d --build
```

| Serviço   | URL                   |
|-----------|-----------------------|
| Frontend  | http://localhost:3001 |
| Backend   | http://localhost:5050 |

### 4. Subir sem Docker

```bash
# Backend
cd back
npm install
npx prisma migrate dev
npm run dev

# Frontend (outro terminal)
cd front
npm install
npm run dev
```

---

## Deploy em Produção

| Parte     | Serviço      |
|-----------|--------------|
| Backend   | Fly.io       |
| Banco     | Neon (PostgreSQL serverless) |
| Frontend  | Vercel       |

### Backend (Fly.io)

```bash
cd back
flyctl launch --no-deploy
flyctl secrets set \
  DATABASE_URL="postgresql://..." \
  JWT_SECRET_KEY="..." \
  SMTP_USER="..." \
  SMTP_PASSWORD="..."
flyctl deploy
```

### Frontend (Vercel)

Conecte o repositório no [Vercel](https://vercel.com), defina o diretório raiz como `front/` e adicione a variável:

```env
VITE_API_URL=https://<seu-app>.fly.dev
```

---

## Licença

Este projeto está licenciado sob a [MIT License](./LICENSE).
