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
         res.status(400).json({ message: 'comentarioEscrito and userId are required' });
         return;
      }

      
      const user = await userRepository.findOne(userId);

      if (!user) {
         res.status(404).json({ message: 'User not found' });
         return;
      }


      const newComentario = comentarioRepository.create({
        comentarioEscrito,
        user,
      });

      await comentarioRepository.save(newComentario);

       res.status(201).json(newComentario);
       return;
    } catch (error) {
       res.status(500).json({ message: 'Internal Server Error', error });
       return;
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
