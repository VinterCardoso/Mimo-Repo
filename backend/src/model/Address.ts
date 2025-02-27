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
}

export interface IAddressRepository {
    create(data: Address): Promise<Address>;
    findMany(): Promise<Address[]>;
    findById(id: number): Promise<Address>;
    findByUserId(userId: number): Promise<Address[]>;
    update(id: number, data: Address): Promise<Address>;
    delete(id: number): Promise<void>;
}

export interface IAddressService {
    createAddress(data: Address): Promise<Address>;
    listAddress(): Promise<Address[]>;
    getAddressById(id: number): Promise<Address>;
    updateAddress(id: number, data: Address): Promise<Address>;
    deleteAddress(id: number): Promise<void>;
    listAddressByUserId(userId: number): Promise<Address[]>;
}
