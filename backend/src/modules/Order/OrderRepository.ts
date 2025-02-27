import { prisma } from "../../infra/database.js";
import { IOrderRepository, Order } from "../../model/Order.js";

class OrderRepository implements IOrderRepository {
    async create(data): Promise<Order> {
        return prisma.order.create({ data });
    }
    
    async findByUserId(id:number): Promise<Order[]> {
        return prisma.order.findMany({ where: { userId: id }, include: { orderHasProduct: { include: {product: true}} } });
    }
    
    async findByOrderId(id:number): Promise<Order> {
        return prisma.order.findFirst({ where: { id }, include: { orderHasProduct: true } });
    }
    
    async addProductToOrder(orderId:number, productId:number, quantity:number): Promise<void> {
        prisma.orderHasProduct.create({ data: { orderId, productId, quantity } });
    }
}

export { OrderRepository };