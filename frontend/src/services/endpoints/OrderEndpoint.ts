import axios from "./_axios";

export type OrderRequest = {
    userId: number
    total: number
    cart: {
        productId: number
        quantity: number
    }[]
}

export class OrderEndpoint {
    async getByUserId(id: number): Promise<OrderRequest[]> {
        return await axios.get(`/orders/byUser/${id}`)
    }

    async getById(id: number): Promise<OrderRequest> {
        return await axios.get(`/orders/${id}`)
    }

    async create(order: OrderRequest): Promise<OrderRequest> {
        return await axios.post('/orders', order)
    }
}