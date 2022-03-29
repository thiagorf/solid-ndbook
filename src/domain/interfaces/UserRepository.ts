import { User } from "../entities/User";



export interface IUserRepository {
    findUserBy(user_id: string): Promise<User>
    create({name}): Promise<User>
}