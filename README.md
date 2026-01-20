# RID220903_Desafio05

Projeto de biblioteca com API em Node.js + Express + Prisma (Postgres) e front-end React.

## Requisitos atendidos
- CRUD completo de livros com as rotas: GET /livros, GET /livros/:id, POST /livros, PUT /livros/:id, DELETE /livros/:id.
- Integracao do front-end com a API via `http://localhost:3000`.

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

## Migracoes (Postgres/Neon)
```bash
cd backend
$env:DATABASE_URL="postgresql://USER:PASS@HOST/DB?sslmode=require"
npx prisma migrate dev --name init
```

## Deploy da API (Render + Neon)
- No Neon, crie o banco Postgres e copie a `DATABASE_URL`.
- No Render, crie um Web Service com:
  - Root Directory: `backend`
  - Build Command: `npm install && npx prisma generate`
  - Start Command: `npm start`
  - Env Vars: `DATABASE_URL` (do Neon)
- No front, ajuste `BASE_URL` em `Desafio05-Front/src/api/LivrosService.js` para a URL do Render.

## Deploy do Front (Netlify)
- Base directory: `Desafio05-Front`
- Build command: `npm run build`
- Publish directory: `dist`

## URLs finais
- Front (Netlify): `https://rid220903desafio05.netlify.app/`
- API (Render): `https://rid220903-desafio05.onrender.com`

## Checklist de entrega
- Repositorio nomeado com o RID (RID220903_Desafio05).
- API funcionando com Postgres (Neon) e rotas CRUD ativas.
- Front integrado consumindo a API no Render.
- Deploy do front no Netlify com rotas SPA funcionando.
