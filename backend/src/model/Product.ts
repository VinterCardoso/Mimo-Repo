export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface IProductRepository {
    create(data: Product): Promise<Product>;
    findMany(): Promise<Product[]>;
    findById(id: number): Promise<Product>;
    update(id: number, data: Product): Promise<Product>;
    delete(id: number): Promise<void>;
}

export interface IProductService {
    createProduct(data: Product): Promise<Product>;
    listProducts(): Promise<Product[]>;
    getProductById(id: number): Promise<Product>;
    updateProduct(id: number, data: Product): Promise<Product>;
    deleteProduct(id: number): Promise<void>;
}
