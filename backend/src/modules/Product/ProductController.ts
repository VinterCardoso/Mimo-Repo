import { FastifyTypedInstance } from '../../types.js';
import { ProductRepository } from './ProductRepository.js';
import { ProductService } from './ProductService.js';

export async function productController(fastify: FastifyTypedInstance) {
    const productRepository: ProductRepository = new ProductRepository();
    const productService: ProductService = new ProductService(productRepository);
    
    fastify.get('/products', async (req, res) => {
        const products = await productService.listProducts();
        res.status(200).send(products);
    });

    fastify.get('/products/:id', async (req, res) => {
        const product = await productService.getProductById(+req.params.id);
        res.status(200).send(product);
    });

    fastify.post('/products', async (req, res) => {
        const product = await productService.createProduct(req.body);
        res.status(201).send(product);
    });

    fastify.patch('/products/:id', async (req, res) => {
        const product = await productService.updateProduct(+req.params.id, req.body);
        res.status(200).send(product);
    });

    fastify.delete('/products/:id', async (req, res) => {
        await productService.deleteProduct(+req.params.id);
        res.status(204).send();
    });
}