import { IUserService } from "../../model/User.js";
import { UserRepository } from "./UserRepository.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { env } from "../../infra/env.js";

class UserService implements IUserService {
    constructor(
        private userRepository: UserRepository
    ) {}

    async createUser(data) {
        data.password = await bcrypt.hash(data.password, 10);
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
        user.phone = data.phone || user.phone;

        return this.userRepository.update(id, user);
    }

    async deleteUser(id) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        return this.userRepository.delete(id);
    }

    async changePassword(id, body) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        const actualPassword = user.password;

        if (await bcrypt.compare(body.oldPassword, actualPassword)) {
            user.password = await bcrypt.hash(body.newPassword, 10);
            
            this.userRepository.update(id, user);
            return;
        }
        throw new Error('Password not correct');
    }

    async login(data) {
        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new Error('User not found');
        }

        if (await bcrypt.compare(data.password, user.password)) {
            const token = jwt.sign({ id: user.id, email: user.email, role: user.role}, env.JWT_SECRET, { expiresIn: '99d' });
            return {user, token};
        }

        throw new Error('Password not correct');
    }
}

export { UserService };