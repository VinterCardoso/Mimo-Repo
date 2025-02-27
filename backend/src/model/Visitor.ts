export interface IOrderVisitor {
    visitOrder(order: Order): void;
    visitProduct(product: Product, quantity: number): void;
    getResult(): Buffer | string;
}