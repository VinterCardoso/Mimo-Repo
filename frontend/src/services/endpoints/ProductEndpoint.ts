import axios from "./_axios";

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    unavailable: boolean;
    deletedAt: Date;
}
 
export class ProductEndpoint {
    async listAll(): Promise<Product[]> {
        return await axios.get('/products')
    }

    async create(product: Product): Promise<Product> {
        return await axios.post('/products', product)
    }

    async update(product: Product): Promise<Product> {
        return await axios.patch(`/products/${product.id}`, product)
    }

    async delete(id: number): Promise<void> {
        return await axios.delete(`/products/${id}`)
    }
}