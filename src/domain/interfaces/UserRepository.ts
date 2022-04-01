import { User } from "../entities/User";



export interface IUserRepository {
    findUserBy(user_id: string): Promise<User>
    create({
        name,
        email,
        password
    }): Promise<User>
    findByEmail(email: string): Promise<User>
}