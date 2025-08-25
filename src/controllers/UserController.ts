import { Request, Response } from 'express';
import { User } from '../models/User';
import { AppDataSource } from '../config/data-source';

const userRepository = AppDataSource.getRepository(User);


export class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const { name } = req.body;
            if (!name) {
                res.status(400).json({ message: 'Name is required' });
                return;
            }


            const newUser = userRepository.create({ name });
            await userRepository.save(newUser);

            res.status(201).json(newUser);
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
            return;
        }
    }

    async getUsers(req: Request, res: Response) {
        try {

            const users = await userRepository.find({ relations: ['comentarios'] });
            res.json(users);
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
            return;
        }
    }
}
