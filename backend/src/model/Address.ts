import { User } from "./User.js"

export type Address = {
    id: number
    name: string
    cep: string
    state: string
    city: string
    street: string
    number: string
    complement?: string
    userId: number
    user: User
}

export interface IAddressRepository {
    create(data: Address): Promise<Address>;
    findMany(): Promise<Address[]>;
    findById(id: number): Promise<Address>;
    update(id: number, data: Address): Promise<Address>;
    delete(id: number): Promise<void>;
}

export interface IAddressService {
    create(data: Address): Promise<Address>;
    list(): Promise<Address[]>;
    getById(id: number): Promise<Address>;
    update(id: number, data: Address): Promise<Address>;
    delete(id: number): Promise<void>;
}
