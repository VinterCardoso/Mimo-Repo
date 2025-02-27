import { Address } from "./Address.js";

type User = {
    id: number;
    name: string;
    email: string;
    cpf: string;
    password: string;
    phone: string;
    role: string;
}

interface IUserRepository {
    create(data: User): Promise<User>;
    findMany(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    findById(id: number): Promise<User>;
    update(id: number, data: User): Promise<User>;
    delete(id: number): Promise<void>;
}

interface IUserService {
    createUser(data: User): Promise<User>;
    listUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    updateUser(id: number, data: User): Promise<User>;
    deleteUser(id: number): Promise<void>;
}

export { User, IUserRepository, IUserService };