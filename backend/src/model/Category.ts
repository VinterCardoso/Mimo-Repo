export type Category = {
    id: number;
    name: string;
}

export interface ICategoryRepository {
    create(data: Category): Promise<Category>;
    findByCategoryId(id: number): Promise<Category>;
    addCategoryToProduct(categoryId:number, productId:number): Promise<Category>;
    delete(id: number): Promise<void>;
}

export interface ICategoryService {
    createCategory(data: Category): Promise<Category>;
    getById(id: number): Promise<Category>;
    addCategoryToProduct(categoryId:number, productId:number): Promise<Category>;
    deleteCategory(id: number): Promise<void>;
}
