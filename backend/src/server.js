const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

require("dotenv/config");

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

function mapLivroToApi(livro) {
  return {
    id: livro.id,
    titulo: livro.titulo,
    num_paginas: livro.paginas,
    isbn: livro.isbn,
    editora: livro.editora,
  };
}

app.get("/livros", async (req, res) => {
  const livros = await prisma.livro.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(livros.map(mapLivroToApi));
});

app.get("/livros/:id", async (req, res) => {
  const id = String(req.params.id);
  const livro = await prisma.livro.findUnique({ where: { id } });

  if (!livro) {
    return res.status(404).json({ mensagem: "Livro nao encontrado." });
  }

  return res.json(mapLivroToApi(livro));
});

app.post("/livros", async (req, res) => {
  const { id, titulo, num_paginas, paginas, isbn, editora } = req.body;

  const paginasValue = Number(num_paginas ?? paginas);
  if (
    !titulo ||
    Number.isNaN(paginasValue) ||
    !isbn ||
    !editora
  ) {
    return res.status(400).json({
      mensagem: "Campos obrigatorios: titulo, num_paginas, isbn, editora.",
    });
  }

  const data = {
    titulo,
    paginas: paginasValue,
    isbn,
    editora,
  };

  if (id !== undefined && id !== null && String(id).trim() !== "") {
    data.id = String(id);
  }

  try {
    const livro = await prisma.livro.create({ data });
    return res.status(201).send("Livro cadastrado com sucesso.");
  } catch (error) {
    return res.status(400).json({
      mensagem: "Nao foi possivel cadastrar o livro.",
    });
  }
});

app.put("/livros/:id", async (req, res) => {
  const id = String(req.params.id);
  const { titulo, num_paginas, paginas, isbn, editora } = req.body;

  const paginasValue = Number(num_paginas ?? paginas);
  if (
    !titulo ||
    Number.isNaN(paginasValue) ||
    !isbn ||
    !editora
  ) {
    return res.status(400).json({
      mensagem: "Campos obrigatorios: titulo, num_paginas, isbn, editora.",
    });
  }

  try {
    await prisma.livro.update({
      where: { id },
      data: {
        titulo,
        paginas: paginasValue,
        isbn,
        editora,
      },
    });
    return res.json({ mensagem: "Livro atualizado com sucesso." });
  } catch (error) {
    return res.status(404).json({ mensagem: "Livro nao encontrado." });
  }
});

app.delete("/livros/:id", async (req, res) => {
  const id = String(req.params.id);

  try {
    await prisma.livro.delete({ where: { id } });
    return res.json({ mensagem: "Livro removido com sucesso." });
  } catch (error) {
    return res.status(404).json({ mensagem: "Livro nao encontrado." });
  }
});

app.listen(port, () => {
  console.log(`API escutando em http://localhost:${port}`);
});
