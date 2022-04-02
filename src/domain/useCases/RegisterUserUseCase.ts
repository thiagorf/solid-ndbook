import { IUserRepository } from "../interfaces/UserRepository";
import {hash} from 'bcrypt';

type UserProps = {
    name: string;
    email: string;
    password: string;
}

export class RegisterUserUseCase {

    constructor(
        private userRepository: IUserRepository
    ) {}

    async perform({
        name,
        email,
        password
    }: UserProps) {
        const userAlReadyExists = await this.userRepository.findByEmail(email);

        if(userAlReadyExists) throw new Error("User email is already been used")

        const hashPassword = await hash(password, 8)

        const user = await this.userRepository.create({
            name,
            email,
            password: hashPassword
        })

        return user;
    }
}