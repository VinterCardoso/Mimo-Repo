import { z } from 'zod'; // Import Zod
import { FastifyTypedInstance } from '../../types.js';
import { CategoryRepository } from './CategoryRepository.js';
import { CategoryService } from './CategoryService.js';

// Define Zod schemas for request parameters and body
const GetCategoryByIdParamsSchema = z.object({
    id: z.string(),
});

const CreateCategoryBodySchema = z.object({
    name: z.string(),
});

const AddCategoryToProductParamsSchema = z.object({
    id: z.string(),
});

const AddCategoryToProductBodySchema = z.object({
    productId: z.number(),
});

const DeleteCategoryParamsSchema = z.object({
    id: z.string(),
});

export async function categoryController(fastify: FastifyTypedInstance) {
    const categoryRepository: CategoryRepository = new CategoryRepository();
    const categoryService: CategoryService = new CategoryService(categoryRepository);

    fastify.get('/category', async (req, res) => {
        const category = await categoryService.getAll();
        res.status(200).send(category);
    });

    fastify.get(
        '/category/:id',
        {
            schema: {
                params: GetCategoryByIdParamsSchema,
            },
        },
        async (req, res) => {
            const { id } = req.params; // Type is inferred from GetCategoryByIdParamsSchema
            const category = await categoryService.getById(+id);
            res.status(200).send(category);
        }
    );

    fastify.post(
        '/category',
        {
            schema: {
                body: CreateCategoryBodySchema,
            },
        },
        async (req, res) => {
            const category = await categoryService.createCategory(req.body);
            res.status(201).send(category);
        }
    );

    fastify.post(
        '/category/:id/addToProduct',
        {
            schema: {
                params: AddCategoryToProductParamsSchema,
                body: AddCategoryToProductBodySchema,
            },
        },
        async (req, res) => {
            const { id } = req.params; // Type is inferred from AddCategoryToProductParamsSchema
            const { productId } = req.body; // Type is inferred from AddCategoryToProductBodySchema
            const category = await categoryService.addCategoryToProduct(+id, productId);
            res.status(201).send(category);
        }
    );

    fastify.delete(
        '/category/:id',
        {
            schema: {
                params: DeleteCategoryParamsSchema,
            },
        },
        async (req, res) => {
            const { id } = req.params; // Type is inferred from DeleteCategoryParamsSchema
            await categoryService.deleteCategory(+id);
            res.status(204).send();
        }
    );
}