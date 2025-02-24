export type Order = {
    id: number;
    userId: number;
    total: number;
    createdAt: Date;
}

export interface IProductRepository {
    create(data: Product): Promise<Product>;
    findByUserId(id: number): Promise<Product[]>;
    findByOrderId(id: number): Promise<Product>;
}

export interface IProductService {
    createProduct(data: Product): Promise<Product>;
    listProducts(): Promise<Product[]>;
}
