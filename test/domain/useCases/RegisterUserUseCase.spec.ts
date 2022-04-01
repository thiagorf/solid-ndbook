import { RegisterUserUseCase } from "../../../src/domain/useCases/RegisterUserUseCase";
import { UserBuilder } from "../../doubles/builders/UserBuilder";
import { InMemoryUserRepository } from "../../implementations/InMemoryUserRepository";



describe("Register User Use Case", () => {
    test("Should be able to create a user", async () => {
        const userBuilder = UserBuilder.aUser().build();

        const userRepository = new InMemoryUserRepository();
        
        const sut = new RegisterUserUseCase(
            userRepository
        );

        const response = await sut.perform(userBuilder);

        expect(response).toMatchObject(userBuilder)
    })

    test("Should not be able to create a user with the same email", async () => {
        const userBuilder = UserBuilder.aUser().build();

        const userRepository = new InMemoryUserRepository();

        await userRepository.create(userBuilder);

        const sut = new RegisterUserUseCase(
            userRepository
        )

        expect(async () => {
            await sut.perform(userBuilder)
        }).rejects.toThrow("User email is already been used")
    })
    
})