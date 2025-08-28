import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";

export class UserController {
  // Buscar todos os usuários com seus comentários
 async getAll(req: Request, res: Response) {
    try {
      const userRepo = AppDataSource.getRepository(User);
      const users = await userRepo.find({ relations: ["comentarios"] });
      return res.json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  // Criar novo usuário
   async create(req: Request, res: Response) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: "O campo 'name' é obrigatório" });
      }

      const userRepo = AppDataSource.getRepository(User);
      const novoUser = userRepo.create({ name });
      await userRepo.save(novoUser);

      return res.status(201).json(novoUser);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
}
