import axios from "./_axios";

export type Address = {
    name: string
    cep: string
    state: string
    city: string
    street:string
    number:string
    complement:string 
    userId:number
}

export class AddressEndpoint {
    async listByUserId(id:number): Promise<Address[]> {
        return await axios.get(`/address/user/${id}`)
    }

    async create(address: Address): Promise<Address> {
        return await axios.post('/address', address)
    }

    async delete(id: number): Promise<void> {
        return await axios.delete(`/address/${id}`)
    }
}