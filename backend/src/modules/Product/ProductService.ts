import { IProductService } from "../../model/Product.js";
import { ProductRepository } from "./ProductRepository.js";

class ProductService implements IProductService {
    constructor(
        private productRepository: ProductRepository
    ) {}

    async createProduct(data) {
        return this.productRepository.create(data);
    }

    async listProducts() {
        return this.productRepository.findMany();
    }

    async getProductById(id) {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new Error('Product not found');
        }

        return product;
    }

    async updateProduct(id, data) {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new Error('Product not found');
        }

        product.name = data.name || product.name;
        product.email = data.email || product.email;
        product.role = data.role || product.role;

        return this.productRepository.update(id, product);
    }

    async deleteProduct(id) {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new Error('Product not found');
        }

        return this.productRepository.delete(id);
    }
}

export { ProductService };