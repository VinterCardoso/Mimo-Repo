import { z } from 'zod'; // Import Zod
import { User } from '../../model/User.js';
import { FastifyTypedInstance } from '../../types.js';
import { UserRepository } from './UserRepository.js';
import { UserService } from './UserService.js';

// Define Zod schemas for request parameters and body
const ChangePasswordParamsSchema = z.object({
    id: z.string(),
});

const ChangePasswordBodySchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
});

const UpdateUserParamsSchema = z.object({
    id: z.string(),
});

const UpdateUserBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
});

const DeleteUserParamsSchema = z.object({
    id: z.string(),
});

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

    fastify.post(
        '/users/change-password/:id',
        {
            schema: {
                params: ChangePasswordParamsSchema,
                body: ChangePasswordBodySchema,
            },
        },
        async (req, res) => {
            const { id } = req.params; // Type is inferred from ChangePasswordParamsSchema
            const body = req.body; // Type is inferred from ChangePasswordBodySchema
            await userService.changePassword(+id, body);
            res.status(204).send();
        }
    );

    fastify.post('/users/login', async (req, res) => {
        const user = await userService.login(req.body);
        res.status(200).send(user);
    });

    fastify.patch(
        '/users/:id',
        {
            schema: {
                params: UpdateUserParamsSchema,
                body: UpdateUserBodySchema,
            },
        },
        async (req, res) => {
            const { id } = req.params; // Type is inferred from UpdateUserParamsSchema
            const body = req.body; // Type is inferred from UpdateUserBodySchema
            const user = await userService.updateUser(+id, body);
            res.status(200).send(user);
        }
    );

    fastify.delete(
        '/users/:id',
        {
            schema: {
                params: DeleteUserParamsSchema,
            },
        },
        async (req, res) => {
            const { id } = req.params; // Type is inferred from DeleteUserParamsSchema
            await userService.deleteUser(+id);
            res.status(204).send();
        }
    );
}