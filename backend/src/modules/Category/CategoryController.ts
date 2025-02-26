import { FastifyTypedInstance } from '../../types.js';
import { CategoryRepository } from './CategoryRepository.js';
import { CategoryService } from './CategoryService.js';

export async function categoryController(fastify: FastifyTypedInstance) {
    const categoryRepository: CategoryRepository = new CategoryRepository();
    const categoryService: CategoryService = new CategoryService(categoryRepository);
    
    fastify.get('/category', async(req, res) => {
        const category = await categoryService.getAll();
        res.status(200).send(category);
    });

    fastify.get('/category/:id', async (req, res) => {
        const category = await categoryService.getById(+req.params.id);
        res.status(200).send(category);
    });

    fastify.post('/category', async (req, res) => {
        const category = await categoryService.createCategory(req.body);
        res.status(201).send(category);
    });

    fastify.post('/category/:id/addToProduct', async (req, res) => {
        const category = await categoryService.addCategoryToProduct(+req.params.id, req.body.productId);
        res.status(201).send(category);
    });

    fastify.delete('/category/:id', async (req, res) => {
        await categoryService.deleteCategory(+req.params.id);
        res.status(204).send();
    });
}
