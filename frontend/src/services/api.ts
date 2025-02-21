import axios from "./endpoints/_axios";
import { ProductEndpoint } from "./endpoints/ProductEndpoint";
import { UserEndpoint } from "./endpoints/UserEndpoint";

const api = {
    user: new UserEndpoint(),
    product: new ProductEndpoint()
}

export type Api = typeof api;

export default api;
export {axios}