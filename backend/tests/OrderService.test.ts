import { OrderService } from '../src/modules/Order/OrderService';

describe('OrderService', () => {
    let orderService: OrderService;
    let orderRepository: any;

    beforeEach(() => {
        orderRepository = {
            create: jest.fn(),
            findByOrderId: jest.fn(),
            findByUserId: jest.fn(),
            addProductToOrder: jest.fn(),
        };
        orderService = new OrderService(orderRepository);
    });

    describe('createOrder', () => {
        it('should throw an error if userId is not provided', async () => {
            await expect(
                orderService.createOrder({ total: 100, cart: [] })
            ).rejects.toThrow('User ID is required');
        });

        it('should throw an error if total is not provided', async () => {
            await expect(
                orderService.createOrder({ userId: 1, cart: [] })
            ).rejects.toThrow('Total is required');
        });

        it('should throw an error if cart is not provided', async () => {
            await expect(
                orderService.createOrder({ userId: 1, total: 100 })
            ).rejects.toThrow('Cart is required');
        });

        it('should create an order and add products to it', async () => {
            orderRepository.create.mockResolvedValue({ id: 1 });
            orderRepository.findByOrderId.mockResolvedValue({ id: 1 });

            await orderService.createOrder({
                userId: 1,
                total: 100,
                cart: [
                    { productId: 1, quantity: 2 },
                    { productId: 2, quantity: 1 },
                ],
            });

            expect(orderRepository.create).toBeCalledWith({ userId: 1, total: 100 });
            expect(orderRepository.findByOrderId).toBeCalledWith(1);
            expect(orderRepository.addProductToOrder).toBeCalledWith(1, 1, 2);
            expect(orderRepository.addProductToOrder).toBeCalledWith(1, 2, 1);
        });
    });

    describe('getOrderByUserId', () => {
        it('should return an order by userId', async () => {
            orderRepository.findByUserId.mockResolvedValue({ id: 1 });

            const order = await orderService.getOrderByUserId(1);

            expect(orderRepository.findByUserId).toBeCalledWith(1);
            expect(order).toEqual({ id: 1 });
        });
    });
});