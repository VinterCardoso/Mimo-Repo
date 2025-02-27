import { prisma } from "../../infra/database.js";
import { IProductRepository, Product } from "../../model/Product.js";

class ProductRepository implements IProductRepository {
    async create(data): Promise<Product> {
        return prisma.product.create({ data });
    }
    
    async findMany(): Promise<Product[]> {
        return prisma.product.findMany({ where: { deletedAt : null } });
    }
    
    async findById(id): Promise<Product> {
        return prisma.product.findUnique({ where: { id } });
    }
    
    async update(id, data): Promise<Product> {
        return prisma.product.update({ where: { id }, data });
    }
    
    async delete(id: number): Promise<void> {
        prisma.product.delete({ where: { id } });
    }
}

export { ProductRepository };