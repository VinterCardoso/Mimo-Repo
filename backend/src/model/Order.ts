export type Order = {
    id: number;
    userId: number;
    total: number;
    createdAt: Date;
}

export interface IOrderRepository {
    create(data: Order): Promise<Order>;
    findByUserId(id: number): Promise<Order[]>;
    findByOrderId(id: number): Promise<Order>;
    addProductToOrder(orderId: number, productId: number, quantity: number): Promise<void>;
}

export interface IOrderService {
    createOrder(data: Order): Promise<Order>;
    getOrderByUserId(id: number): Promise<Order[]>;
    getOrderByOrderId(id: number): Promise<Order>;
    addProductToOrder(orderId: number, product: number, quantity: number): Promise<void>;
}
