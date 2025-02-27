import { prisma } from "../../infra/database.js";
import { ICategoryRepository, Category } from "../../model/Category.js";

class CategoryRepository implements ICategoryRepository {
    
    async getAll(): Promise<Category[]> {
        return prisma.category.findMany();
    }
    
    async create(data): Promise<Category> {
        return prisma.category.create({ data });
    }
    
    async findByCategoryId(id:number): Promise<Category> {
        return prisma.category.findFirst({ where: { id } });
    }
    
    async addCategoryToProduct(categoryId:number, productId:number): Promise<void> {
        prisma.productHasCategory.create({ data: { categoryId, productId} });
    }

    async delete(id: number): Promise<void> {
        prisma.category.delete({where: { id }});
    }
}

export { CategoryRepository };