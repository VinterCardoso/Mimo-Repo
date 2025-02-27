import { z } from 'zod'; // Import Zod
import { FastifyTypedInstance } from '../../types.js';
import { ProductRepository } from './ProductRepository.js';
import { ProductService } from './ProductService.js';

// Define Zod schemas for request parameters and body
const CreateProductBodySchema = z.object({
    name: z.string(),
    price: z.number().positive(),
    description: z.string().optional(),
});

const UpdateProductParamsSchema = z.object({
    id: z.string(),
});

const UpdateProductBodySchema = z.object({
    name: z.string().optional(),
    price: z.number().positive().optional(),
    description: z.string().optional(),
});

const DeleteProductParamsSchema = z.object({
    id: z.string(),
});

export async function productController(fastify: FastifyTypedInstance) {
    const productRepository: ProductRepository = new ProductRepository();
    const productService: ProductService = new ProductService(productRepository);

    fastify.get('/products', async (req, res) => {
        const products = await productService.listProducts();
        res.status(200).send(products);
    });

    fastify.post(
        '/products',
        {
            schema: {
                body: CreateProductBodySchema,
            },
        },
        async (req, res) => {
            const product = await productService.createProduct(req.body);
            res.status(201).send(product);
        }
    );

    fastify.patch(
        '/products/:id',
        {
            schema: {
                params: UpdateProductParamsSchema,
                body: UpdateProductBodySchema,
            },
        },
        async (req, res) => {
            const { id } = req.params; // Type is inferred from UpdateProductParamsSchema
            const body = req.body; // Type is inferred from UpdateProductBodySchema
            const product = await productService.updateProduct(+id, body);
            res.status(200).send(product);
        }
    );

    fastify.delete(
        '/products/:id',
        {
            schema: {
                params: DeleteProductParamsSchema,
            },
        },
        async (req, res) => {
            const { id } = req.params; // Type is inferred from DeleteProductParamsSchema
            await productService.deleteProduct(+id);
            res.status(204).send();
        }
    );
}