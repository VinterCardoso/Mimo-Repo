import { FastifyReply, FastifyRequest } from "fastify";

export async function AuthMiddleware(req: FastifyRequest, reply: FastifyReply) {
    const token = req.headers['authorization'];

    if (!token) {
        reply.status(401).send({ message: 'Token not provided' });
    }
}