import axios from "./endpoints/_axios";
import { UserEndpoint } from "./endpoints/UserEndpoint";

const api = {
    user: new UserEndpoint()
}

export type Api = typeof api;

export default api;
export {axios}