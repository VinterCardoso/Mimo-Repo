import { FastifyTypedInstance } from '../../types.js';
import { OrderRepository } from './OrderRepository.js';
import { OrderService } from './OrderService.js';

export async function orderController(fastify: FastifyTypedInstance) {
    const orderRepository: OrderRepository = new OrderRepository();
    const orderService: OrderService = new OrderService(orderRepository);
    
    fastify.get('/orders/:id', async (req, res) => {
        const order = await orderService.getOrderByOrderId(+req.params.id);
        res.status(200).send(order);
    });

    fastify.get('/orders/byUser/:id', async (req, res) => {
        const order = await orderService.getOrderByUserId(+req.params.id);
        res.status(200).send(order);
    });

    fastify.post('/orders', async (req, res) => {
        const order = await orderService.createOrder(req.body);
        res.status(201).send(order);
    });
}