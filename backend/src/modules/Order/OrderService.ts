import { IOrderService } from "../../model/Order.js";
import { OrderRepository } from "./OrderRepository.js";

class OrderService implements IOrderService {
    constructor(
        private orderRepository: OrderRepository
    ) {}

    async createOrder(data) {
        if (!data.userId) {
            throw new Error('User ID is required');
        }
        if (!data.total) {
            throw new Error('Total is required');
        }
        if (!data.cart) {
            throw new Error('Cart is required');
        }
        const orderObj = {
            userId: data.userId,
            total: data.total,
        }
        let order = await this.orderRepository.create(orderObj);
        const cart = data.cart;
        cart.forEach(async (product) => {
            await this.addProductToOrder(order.id, product.productId, product.quantity);
        });
        order = await this.orderRepository.findByOrderId(order.id);
        return order;
    }

    async getOrderByUserId(id) {
        const order = await this.orderRepository.findByUserId(id);

        if (!order) {
            throw new Error('Order not found');
        }

        return order;
    }

    async getOrderByOrderId(id) {
        const order = await this.orderRepository.findByOrderId(id);

        if (!order) {
            throw new Error('Order not found');
        }

        return order;
    }

    async addProductToOrder(orderId, product, quantity) {
        const order = await this.orderRepository.findByOrderId(orderId);

        if (!order) {
            throw new Error('Order not found');
        }

        return this.orderRepository.addProductToOrder(orderId, product, quantity);
    }
}

export { OrderService };