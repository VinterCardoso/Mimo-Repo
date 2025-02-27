import { ProductService } from '../src/modules/Product/ProductService';
import { ProductRepository } from '../src/modules/Product/ProductRepository';
import { jest } from '@jest/globals';
import { Product } from '../src/model/Product'; // Import the Product type

describe('ProductService', () => {
    let productService: ProductService;
    let productRepository: jest.Mocked<ProductRepository>;

    beforeEach(() => {
        // Mock the ProductRepository
        productRepository = {
            create: jest.fn(),
            findMany: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
        } as unknown as jest.Mocked<ProductRepository>;

        // Initialize ProductService with the mocked repository
        productService = new ProductService(productRepository);
    });

    describe('createProduct', () => {
        it('should create a product', async () => {
            const productData: Product = {
                id: 1,
                name: 'Test Product',
                description: 'Test Description',
                price: 100,
                quantity: 10,
                unavailable: false,
                photoUrl: 'http://example.com/photo.jpg',
                deletedAt: null, // Add deletedAt
            };

            productRepository.create.mockResolvedValue(productData);

            const result = await productService.createProduct(productData);

            expect(productRepository.create).toBeCalledWith(productData);
            expect(result).toEqual(productData);
        });
    });

    describe('listProducts', () => {
        it('should list all products', async () => {
            const products: Product[] = [
                {
                    id: 1,
                    name: 'Product 1',
                    description: 'Description 1',
                    price: 100,
                    quantity: 10,
                    unavailable: false,
                    photoUrl: 'http://example.com/photo1.jpg',
                    deletedAt: null,
                },
                {
                    id: 2,
                    name: 'Product 2',
                    description: 'Description 2',
                    price: 200,
                    quantity: 20,
                    unavailable: false,
                    photoUrl: 'http://example.com/photo2.jpg',
                    deletedAt: null,
                },
            ];

            productRepository.findMany.mockResolvedValue(products);

            const result = await productService.listProducts();

            expect(productRepository.findMany).toBeCalled();
            expect(result).toEqual(products);
        });
    });

    describe('getProductById', () => {
        it('should return a product by ID', async () => {
            const product: Product = {
                id: 1,
                name: 'Test Product',
                description: 'Test Description',
                price: 100,
                quantity: 10,
                unavailable: false,
                photoUrl: 'http://example.com/photo.jpg',
                deletedAt: null,
            };

            productRepository.findById.mockResolvedValue(product);

            const result = await productService.getProductById(1);

            expect(productRepository.findById).toBeCalledWith(1);
            expect(result).toEqual(product);
        });

        it('should throw an error if product is not found', async () => {
            productRepository.findById.mockResolvedValue(null);

            await expect(productService.getProductById(1)).rejects.toThrow('Product not found');
            expect(productRepository.findById).toBeCalledWith(1);
        });
    });

    describe('updateProduct', () => {
        it('should update a product', async () => {
            const existingProduct: Product = {
                id: 1,
                name: 'Old Name',
                description: 'Old Description',
                price: 100,
                quantity: 10,
                unavailable: false,
                photoUrl: 'http://example.com/old.jpg',
                deletedAt: null,
            };

            const updateData = {
                name: 'New Name',
                price: 200,
            };

            const updatedProduct: Product = {
                ...existingProduct,
                ...updateData,
            };

            productRepository.findById.mockResolvedValue(existingProduct);
            productRepository.update.mockResolvedValue(updatedProduct);

            const result = await productService.updateProduct(1, updateData);

            expect(productRepository.findById).toBeCalledWith(1);
            expect(productRepository.update).toBeCalledWith(1, updatedProduct);
            expect(result).toEqual(updatedProduct);
        });

        it('should throw an error if product is not found', async () => {
            productRepository.findById.mockResolvedValue(null);

            await expect(productService.updateProduct(1, { name: 'New Name' })).rejects.toThrow('Product not found');
            expect(productRepository.findById).toBeCalledWith(1);
        });
    });

    describe('deleteProduct', () => {
        it('should soft delete a product', async () => {
            const product: Product = {
                id: 1,
                name: 'Test Product',
                description: 'Test Description',
                price: 100,
                quantity: 10,
                unavailable: false,
                photoUrl: 'http://example.com/photo.jpg',
                deletedAt: null,
            };

            productRepository.findById.mockResolvedValue(product);
            productRepository.update.mockResolvedValue({ ...product, deletedAt: new Date() });

            await productService.deleteProduct(1);

            expect(productRepository.findById).toBeCalledWith(1);
            expect(productRepository.update).toBeCalledWith(1, { ...product, deletedAt: expect.any(Date) });
        });

        it('should throw an error if product is not found', async () => {
            productRepository.findById.mockResolvedValue(null);

            await expect(productService.deleteProduct(1)).rejects.toThrow('Product not found');
            expect(productRepository.findById).toBeCalledWith(1);
        });
    });
});