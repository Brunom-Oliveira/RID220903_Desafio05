# RID220903_Desafio05

Projeto de biblioteca com API em Node.js + Express + Prisma (SQLite) e front-end React.

## Requisitos atendidos
- CRUD completo de livros com as rotas: GET /livros, GET /livros/:id, POST /livros, PUT /livros/:id, DELETE /livros/:id.
- Integração do front-end com a API via `http://localhost:3000`.

## Como rodar localmente

### Backend
```bash
cd backend
npm install
npx prisma generate
npm run dev
```

Servidor: `http://localhost:3000`

### Front-end
```bash
cd Desafio05-Front
npm install
npm run dev
```

Aplicacao: `http://localhost:5173`

## Estrutura de dados (Livro)
- id (string, unico)
- titulo (string)
- paginas (int)
- isbn (string, unico)
- editora (string)

## Deploy da API (Render + Neon)
- No Neon, crie o banco Postgres e copie a `DATABASE_URL`.
- No Render, crie um Web Service com:
  - Root Directory: `backend`
  - Build Command: `npm install && npx prisma generate`
  - Start Command: `npm start`
  - Env Vars: `DATABASE_URL` (do Neon)
- No front, ajuste `BASE_URL` em `Desafio05-Front/src/api/LivrosService.js` para a URL do Render.
