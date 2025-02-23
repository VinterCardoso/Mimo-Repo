import { IAddressService } from "../../model/Address.js";
import { AddressRepository } from "./AddressRepository.js";

class AddressService implements IAddressService {
    constructor(
        private addressRepository: AddressRepository
    ) {}

    async createAddress(data) {
        return this.addressRepository.create(data);
    }

    async listAddress() {
        return this.addressRepository.findMany();
    }

    async getAddressById(id) {
        const address = await this.addressRepository.findById(id);

        if (!address) {
            throw new Error('Address not found');
        }

        return address;
    }

    async updateAddress(id, data) {
        const address = await this.addressRepository.findById(id);

        if (!address) {
            throw new Error('address not found');
        }

        address.name = data.name || address.name;
        address.cep = data.cep || address.cep;
        address.state = data.state || address.state;
        address.city = data.city || address.city;
        address.street = data.street || address.street;
        address.number = data.number || address.number;
        address.complement = data.complement || address.complement;

        return this.addressRepository.update(id, address);
    }

    async deleteAddress(id) {
        const address = await this.addressRepository.findById(id);

        if (!address) {
            throw new Error('Address not found');
        }

        this.addressRepository.delete(id);
    }
}

export { AddressService };