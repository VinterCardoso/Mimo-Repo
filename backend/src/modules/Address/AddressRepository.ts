import { prisma } from "../../infra/database.js";
import { IAddressRepository, Address } from "../../model/Address.js";

class AddressRepository implements IAddressRepository {
    async create(data): Promise<Address> {
        return prisma.address.create({ data });
    }
    
    async findMany(): Promise<Address[]> {
        return prisma.address.findMany();
    }
    
    async findById(id): Promise<Address> {
        return prisma.address.findUnique({ where: { id } });
    }

    async findByUserId(userId): Promise<Address[]> {
        return prisma.address.findMany({ where: { userId } });
    }
    
    async update(id, data): Promise<Address> {
        return prisma.address.update({ where: { id }, data });
    }
    
    async delete(id): Promise<void> {
        prisma.address.delete({ where: { id } });
    }
}

export { AddressRepository };