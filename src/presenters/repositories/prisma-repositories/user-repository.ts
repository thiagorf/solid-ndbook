import { User } from "../../../domain/entities/User";
import { IUserRepository, UserProps } from "../../../domain/interfaces/UserRepository";
import prisma from "../../../infra/prisma-client";



export class PrismaUserRepository implements IUserRepository {

    async findUserBy(user_id: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                id: user_id
            }
        });

        return user;
    }

    async create({ name, email, password }: UserProps): Promise<User> {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        return user
    }

}