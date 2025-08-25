import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Comentario } from '../models/Comentario';
import { User } from '../models/User';

const userRepository = AppDataSource.getRepository(User);
const comentarioRepository = AppDataSource.getRepository(Comentario);

export class ComentarioController {
   async createComentario(req: Request, res: Response) {
    try {
      const { comentarioEscrito, userId } = req.body;

      if (!comentarioEscrito || !userId) {
        return res.status(400).json({ message: 'comentarioEscrito and userId are required' });
      }

      
      const user = await userRepository.findOne(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }


      const newComentario = comentarioRepository.create({
        comentarioEscrito,
        user,
      });

      await comentarioRepository.save(newComentario);

      return res.status(201).json(newComentario);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

   async getComentariosByUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const comentarios = await comentarioRepository.find({
        where: { user: { id: userId } },
        relations: ['user'],
      });

      return res.json(comentarios);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  }
}
