import { FastifyTypedInstance } from "./types.js";

export async function routes(app: FastifyTypedInstance) {
    app.get('/', async (request, reply) => {
        return { hello: 'world' }
    })
}