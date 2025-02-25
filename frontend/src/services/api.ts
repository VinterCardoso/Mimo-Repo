import axios from "./endpoints/_axios";
import { OrderEndpoint } from "./endpoints/OrderEndpoint";
import { ProductEndpoint } from "./endpoints/ProductEndpoint";
import { UserEndpoint } from "./endpoints/UserEndpoint";

const api = {
    user: new UserEndpoint(),
    product: new ProductEndpoint(),
    order: new OrderEndpoint()
}

export type Api = typeof api;

export default api;
export {axios}