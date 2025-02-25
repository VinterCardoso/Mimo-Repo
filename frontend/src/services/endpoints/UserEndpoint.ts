import axios from "./_axios";

export type User = {
    id: number;
    name: string;
    email: string;
    cpf: string;
    password: string;
    phone: string;
    role: string;
}

export type LoginData = {
    user: User;
    token: string;
}

export class UserEndpoint {
    async listAll(): Promise<User[]> {
        return await axios.get('/users')
    }

    async create(user: User): Promise<User> {
        return await axios.post('/users', user)
    }

    async update(user: User): Promise<User> {
        return await axios.patch(`/users/${user.id}`, user)
    }

    async delete(id: number): Promise<void> {
        return await axios.delete(`/users/${id}`)
    }

    async login(email: string, password: string): Promise<LoginData> {
        return await axios.post('/users/login', { email, password })
    }
}