import { Role } from "../types/Roles.js";
import { Address } from "./Address.js";

type User = {
    id: string;
    name: string;
    email: string;
    role: Role;
    address: Address[]
}

interface IUserRepository {
    create(data: User): Promise<User>;
    findMany(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    update(id: string, data: User): Promise<User>;
    delete(id: string): Promise<User>;
}

interface IUserService {
    createUser(data: User): Promise<User>;
    listUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    updateUser(id: string, data: User): Promise<User>;
    deleteUser(id: string): Promise<User>;
}

export { User, IUserRepository, IUserService };