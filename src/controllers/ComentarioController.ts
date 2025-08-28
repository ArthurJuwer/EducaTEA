import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Comentario } from "../models/Comentario";
import { User } from "../models/User";

export class ComentarioController {
  // Buscar todos os comentários (com dados do usuário)
  async getAll(req: Request, res: Response) {
    try {
      const comentarioRepo = AppDataSource.getRepository(Comentario);
      const comentarios = await comentarioRepo.find({ relations: ["user"] });
      return res.json(comentarios);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  // Criar novo comentário vinculado a um usuário
  async create(req: Request, res: Response) {
    try {
      const { userId, comentarioEscrito } = req.body;

      if (!userId || !comentarioEscrito) {
        return res.status(400).json({
          message: "Campos 'userId' e 'comentarioEscrito' são obrigatórios",
        });
      }

      const userRepo = AppDataSource.getRepository(User);
      const comentarioRepo = AppDataSource.getRepository(Comentario);

      const user = await userRepo.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const novoComentario = comentarioRepo.create({ comentarioEscrito, user });
      await comentarioRepo.save(novoComentario);

      return res.status(201).json(novoComentario);
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
}
