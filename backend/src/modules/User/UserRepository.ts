import { prisma } from "../../infra/database.js";
import { IUserRepository, User } from "../../model/User.js";
import { User } from "../../model/User.js";

class UserRepository implements IUserRepository {
    async create(data): Promise<User> {
        return prisma.user.create({ data });
    }
    
    async findMany(): Promise<User[]> {
        return prisma.user.findMany();
    }

    async findByEmail(email: string): Promise<User> {
        return prisma.user.findUnique({where : {email}});
    }
    
    async findById(id): Promise<User> {
        return prisma.user.findUnique({ where: { id } });
    }
    
    async update(id, data): Promise<User> {
        return prisma.user.update({ where: { id }, data });
    }
    
    async delete(id): void {
        return prisma.user.delete({ where: { id } });
    }
}

export { UserRepository };