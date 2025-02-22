import { FastifyTypedInstance } from '../../types.js';
import { UserRepository } from './UserRepository.js';
import { UserService } from './UserService.js';

export async function userController(fastify: FastifyTypedInstance) {
    const userRepository: UserRepository = new UserRepository();
    const userService: UserService = new UserService(userRepository);
    
    fastify.get('/users', async (req, res) => {
        const users = await userService.listUsers();
        res.status(200).send(users);
    });

    fastify.post('/users', async (req, res) => {
        const user = await userService.createUser(req.body);
        res.status(201).send(user);
    });

    fastify.post('/users/change-password/:id', async(req, res) => {
        await userService.changePassword(+req.params.id, req.body);
        res.status(204).send();
    })

    fastify.patch('/users/:id', async (req, res) => {
        const user = await userService.updateUser(+req.params.id, req.body);
        res.status(200).send(user);
    });

    fastify.delete('/users/:id', async (req, res) => {
        await userService.deleteUser(+req.params.id);
        res.status(204).send();
    });
}