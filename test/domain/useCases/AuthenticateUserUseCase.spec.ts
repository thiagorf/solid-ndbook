import { AuthenticateUserUseCase } from "../../../src/domain/useCases/AuthenticateUserUseCase"
import { UserBuilder } from "../../doubles/builders/UserBuilder";
import { InMemoryUserRepository } from "../../implementations/InMemoryUserRepository";


const makeSut = () => {
    const userRepository = new InMemoryUserRepository()

    const sut = new AuthenticateUserUseCase(
        userRepository
    );

    return {
        sut,
        userRepository
    }
}

describe("Authenticate User Use Case" , () => {

    test("Should be able to authenticate a user", async () => {
        const userBuilder = UserBuilder.aUser().withHashPassword().build();
        
        const { 
            sut,
            userRepository 
        } = makeSut()

        await userRepository.create(userBuilder)

        const response = await sut.perform({...userBuilder, password: "1234"})

        expect(response.token).not.toBeUndefined()
    })

    test("Should not be able to authenticate a invalid user", async () => {
        const userBuilder = UserBuilder.aUser().build();

        const {
            sut
        } = makeSut();

        expect(async () => {
            await sut.perform(userBuilder)
        }).rejects.toThrow("Invalid User")
    })

    test("Should not be able to authenticate a user with wrong password", async () => {
        const userBuilder = UserBuilder.aUser().build();

        const { 
            sut,
            userRepository 
        } = makeSut()

        await userRepository.create(userBuilder)

        expect(async () => {
            await sut.perform(userBuilder)
        }).rejects.toThrow("Invalid email or password")
    })
})