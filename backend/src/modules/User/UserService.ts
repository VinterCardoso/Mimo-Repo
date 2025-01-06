import { IUserService } from "../../model/User.js";
import { UserRepository } from "./UserRepository.js";

class UserService implements IUserService {
    constructor(
        private userRepository: UserRepository
    ) {}

    async createUser(data) {
        return this.userRepository.create(data);
    }

    async listUsers() {
        return this.userRepository.findMany();
    }

    async getUserById(id) {
        return this.userRepository.findById(id);
    }

    async updateUser(id, data) {
        return this.userRepository.update(id, data);
    }

    async deleteUser(id) {
        return this.userRepository.delete(id);
    }
}

export { UserService };