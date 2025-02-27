import { z } from 'zod'; // Import Zod
import { FastifyTypedInstance } from '../../types.js';
import { OrderRepository } from './OrderRepository.js';
import { OrderService } from './OrderService.js';

// Define Zod schemas for request parameters and body
const GetOrderByIdParamsSchema = z.object({
    id: z.string(),
});

const GetOrderByUserIdParamsSchema = z.object({
    id: z.string(),
});

const CreateOrderBodySchema = z.object({
    userId: z.number(),
    total: z.number().positive(),
    cart: z.array(
        z.object({
            productId: z.number(),
            quantity: z.number().positive(),
        })
    ),
});

export async function orderController(fastify: FastifyTypedInstance) {
    const orderRepository: OrderRepository = new OrderRepository();
    const orderService: OrderService = new OrderService(orderRepository);

    fastify.get(
        '/orders/:id',
        {
            schema: {
                params: GetOrderByIdParamsSchema,
            },
        },
        async (req, res) => {
            const { id } = req.params; // Type is inferred from GetOrderByIdParamsSchema
            const order = await orderService.getOrderByOrderId(+id);
            res.status(200).send(order);
        }
    );

    fastify.get(
        '/orders/byUser/:id',
        {
            schema: {
                params: GetOrderByUserIdParamsSchema,
            },
        },
        async (req, res) => {
            const { id } = req.params; // Type is inferred from GetOrderByUserIdParamsSchema
            const order = await orderService.getOrderByUserId(+id);
            res.status(200).send(order);
        }
    );

    fastify.post(
        '/orders',
        {
            schema: {
                body: CreateOrderBodySchema,
            },
        },
        async (req, res) => {
            const order = await orderService.createOrder(req.body);
            res.status(201).send(order);
        }
    );
}