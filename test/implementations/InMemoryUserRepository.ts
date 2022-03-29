import { User } from "../../src/domain/entities/User";
import { IUserRepository } from "../../src/domain/interfaces/UserRepository";

type UserProps = {
    name: string
}

export class InMemoryUserRepository implements IUserRepository{

    user: User[] = [];

    private id = 0

    async findUserBy(user_id: string): Promise<User> {
        const user = this.user.find(user => user.id === user_id)

        return user;
    }

    async create({ name }: UserProps) {
        const user: User = {
            id: this.id.toString(),
            name
        }

        this.id++

        this.user.push(user);

        return user;
    }

    async getAlluser() {
        return this.user
    }
}