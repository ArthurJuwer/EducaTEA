import { Request, Response } from 'express';
import { User } from '../models/User';
import { AppDataSource } from '../config/data-source';

const userRepository = AppDataSource.getRepository(User);


export class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ message: 'Name is required' });
            }


            const newUser = userRepository.create({ name });
            await userRepository.save(newUser);

            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    async getUsers(req: Request, res: Response) {
        try {

            const users = await userRepository.find({ relations: ['comentarios'] });
            return res.json(users);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
}
