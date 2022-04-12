import { ReturnAllBooksUseCase } from "../../../src/domain/useCases/ReturnAllBooksUseCase"
import { BookBuilder } from "../../doubles/builders/BookBuilder";
import { InMemoryBookRepository } from "../../implementations/InMemoryBookRepository";



describe("Renturn All Books Use Case", () => {
    test("Should be able to return all books", async () => {
        const bookBuilder = BookBuilder.aBook().build();

        const bookRepository = new InMemoryBookRepository()

        await bookRepository.create(bookBuilder)

        const sut = new ReturnAllBooksUseCase(
            bookRepository
        );

        const result = await sut.perform();

        expect(result).toMatchObject([bookBuilder])
    })
})