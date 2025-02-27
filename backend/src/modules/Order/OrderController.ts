import { z } from 'zod'; // Import Zod
import { FastifyTypedInstance } from '../../types.js';
import { OrderRepository } from './OrderRepository.js';
import { OrderService } from './OrderService.js';
import { ExcelOrderVisitor } from '../Visitor/ExcelVisitor.js';
import { PDFOrderVisitor } from '../Visitor/PdfVisitor.js';

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

const ExportOrderParamsSchema = z.object({
    id: z.string(),
    format: z.enum(['excel', 'pdf']),
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
            const { id } = req.params;
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
            const { id } = req.params;
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

    fastify.get(
        '/orders/export/:id/:format',
        {
            schema: {
                params: ExportOrderParamsSchema,
            },
        },
        async (req, res) => {
            const { id, format } = req.params;

            let visitor;
            if (format === 'excel') {
                visitor = new ExcelOrderVisitor();
            } else if (format === 'pdf') {  
                visitor = new PDFOrderVisitor();
            } else {
                res.status(400).send({ message: 'Invalid export format' });
                return;
            }

            try {
                const result = await orderService.exportOrder(+id, visitor);

                if (format === 'excel') {
                    res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                    res.header('Content-Disposition', `attachment; filename=order_${id}.xlsx`);
                } else if (format === 'pdf') {
                    res.header('Content-Type', 'application/pdf');
                    res.header('Content-Disposition', `attachment; filename=order_${id}.pdf`);
                }

                res.status(200).send(result);
            } catch (error) {
                res.status(500).send({ message: 'Failed to export order', error: error.message });
            }
        }
    );
}