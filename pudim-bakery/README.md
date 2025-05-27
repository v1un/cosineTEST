# Pudim Bakery

Este é o site da padaria "Pudim" com painel administrativo fácil de usar.

## Tecnologias

- [Next.js](https://nextjs.org/) (frontend e backend)
- [Prisma](https://www.prisma.io/) (ORM)
- [SQLite](https://www.sqlite.org/) (banco de dados local)
- Painel admin fácil de usar (/admin)
- Frontend em português

## Rodando localmente

1. Instale as dependências:

```bash
npm install
```

2. Configure o banco de dados:

```bash
npx prisma migrate dev --name init
```

3. Rode o projeto:

```bash
npm run dev
```

## Estrutura

- `/` — Página principal com produtos e informações da padaria
- `/admin` — Painel administrativo para gerenciar produtos