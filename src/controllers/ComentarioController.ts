import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Comentario } from "../models/Comentario";
import { User } from "../models/User";

export class ComentarioController {
  // Buscar todos os comentários (com dados do usuário)
  async getAll(req: Request, res: Response) {
   try {
     const comentarioRepo = AppDataSource.getRepository(Comentario);
     const comentarios = await comentarioRepo.find(); // <- sem "relations"
     return res.json(comentarios);
   } catch (error) {
     console.error("Erro ao buscar comentários:", error);
     return res.status(500).json({ message: "Erro interno no servidor" });
   }
 }

  // Criar novo comentário vinculado a um usuário
  async create(req: Request, res: Response) {
   try {
     const { name, comentarioEscrito } = req.body;

     // validação simples
     if (!name?.trim() || !comentarioEscrito?.trim()) {
       return res.status(400).json({
         message: "Campos 'name' e 'comentarioEscrito' são obrigatórios",
       });
     }

     const comentarioRepo = AppDataSource.getRepository(Comentario);

     const novoComentario = comentarioRepo.create({
       name,
       comentarioEscrito,
     });

     await comentarioRepo.save(novoComentario);

     return res.status(201).json({
       message: "Comentário criado com sucesso!",
       comentario: novoComentario,
     });
   } catch (error) {
     console.error("Erro ao criar comentário:", error);
     return res.status(500).json({ message: "Erro interno no servidor" });
   }
 }
}
