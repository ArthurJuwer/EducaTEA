import express from "express";
import { AppDataSource } from "../src/config/data-source";
import { Comentario } from "../src/models/Comentario";

const app = express();
app.use(express.json());

app.get("/api/comentarios", async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(Comentario);
    const comentarios = await repo.find();
    res.json(comentarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno" });
  }
});

app.post("/api/comentarios", async (req, res) => {
  try {
    const { name, comentarioEscrito } = req.body;
    const repo = AppDataSource.getRepository(Comentario);
    const novoComentario = repo.create({ name, comentarioEscrito });
    await repo.save(novoComentario);
    res.status(201).json(novoComentario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno" });
  }
});

export default app;