import { prisma } from "../../infra/database.js";
import { IUserRepository, User } from "../../model/User.js";

class UserRepository implements IUserRepository {
    async create(data) {
        return prisma.user.create({ data });
    }
    
    async findMany() {
        return prisma.user.findMany();
    }

    async findByEmail(email: string): Promise<User> {
        return prisma.user.findUnique({where : {email}});
    }
    
    async findById(id) {
        return prisma.user.findUnique({ where: { id } });
    }
    
    async update(id, data) {
        return prisma.user.update({ where: { id }, data });
    }
    
    async delete(id) {
        return prisma.user.delete({ where: { id } });
    }
}

export { UserRepository };