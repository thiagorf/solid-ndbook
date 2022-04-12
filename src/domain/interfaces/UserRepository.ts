import { User } from "../entities/User";

export type UserProps = {
    name: string,
    email: string,
    password: string
}


export interface IUserRepository {
    findUserBy(user_id: string): Promise<User>
    create({
        name,
        email,
        password
    }: UserProps): Promise<User>
    findByEmail(email: string): Promise<User>
}