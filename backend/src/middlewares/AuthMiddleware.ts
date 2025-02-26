import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';
import { env } from "../infra/env.js";

export async function AuthMiddleware(req: FastifyRequest, reply: FastifyReply) {
    const token = req.headers['authorization'];

    if (!token) {
        reply.status(401).send({ message: 'Token not provided' });
    }

    if (jwt.verify(token, env.JWT_SECRET)) {
        req.headers['user'] = jwt.decode(token);
        return;
    } else { 
        reply.status(401).send({ message: 'Invalid token provided' });
    }
}