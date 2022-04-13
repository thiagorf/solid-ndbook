import { AuthenticateUserUseCase } from "../../../../domain/useCases/AuthenticateUserUseCase";
import { RegisterUserUseCase } from "../../../../domain/useCases/RegisterUserUseCase";
import { PrismaUserRepository } from "../../../repositories/prisma-repositories/user-repository";



const userRepository = new PrismaUserRepository();

const registerUserUseCase = new RegisterUserUseCase(userRepository);
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);

export {
    registerUserUseCase,
    authenticateUserUseCase
}