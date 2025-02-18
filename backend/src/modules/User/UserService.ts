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
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    async updateUser(id, data) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        user.name = data.name || user.name;
        user.email = data.email || user.email;
        user.role = data.role || user.role;

        return this.userRepository.update(id, user);
    }

    async deleteUser(id) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        return this.userRepository.delete(id);
    }
}

export { UserService };