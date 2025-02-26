import { promises } from "dns";
import { Category, ICategoryService } from "../../model/Category.js";
import { CategoryRepository } from "./CategoryRepository.js";

class CategoryService implements ICategoryService {
    constructor(
        private categoryRepository: CategoryRepository
    ) {}

    async getAll(): Promise<Category[]> {
        return this.categoryRepository.getAll();
    }

    async createCategory(data: Category): Promise<Category> {
        return this.categoryRepository.create(data);
    }

    async getById(id: number): Promise<Category> {
        const category = await this.categoryRepository.findByCategoryId(id);

        if (!category) {
            throw new Error('Category not found');
        }

        return category;
    }

    async addCategoryToProduct(categoryId: number, productId: number): Promise<Category> {
        const category = await this.categoryRepository.findByCategoryId(categoryId);

        if (!category) {
            throw new Error('Category not found');
        }

        return this.categoryRepository.addCategoryToProduct(categoryId, productId);
    }

    async deleteCategory(id: number): Promise<void> {
        const category = await this.categoryRepository.findByCategoryId(id);

        if (!category) {
            throw new Error('Category not found');
        }

        this.categoryRepository.delete(id);
    }
}


export { CategoryService };