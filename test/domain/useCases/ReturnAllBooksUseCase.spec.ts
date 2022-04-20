import { ReturnAllBooksUseCase } from "../../../src/domain/useCases/ReturnAllBooksUseCase"
import { BookBuilder } from "../../doubles/builders/BookBuilder";
import { InMemoryBookRepository } from "../../implementations/InMemoryBookRepository";

jest.useFakeTimers('modern').setSystemTime(new Date(2022, 2, 1, 7));


describe("Renturn All Books Use Case", () => {
    test("Should be able to return all books", async () => {
        const bookBuilder = BookBuilder.aBook().build();

        const bookRepository = new InMemoryBookRepository()

        const limit = 2

        for(let i = 0; limit > i; i++) {
            await bookRepository.create({...bookBuilder, name: `${bookBuilder.name}${i}`})
        }

        const sut = new ReturnAllBooksUseCase(
            bookRepository
        );

        const result = await sut.perform({limit: String(limit)});
        
        expect(result.books).toHaveLength(limit)
    })

    test("Should be able to paginate with cursor", async () => {
        const bookBuilder = BookBuilder.aBook().build();

        const bookRepository = new InMemoryBookRepository()

        const limit = 3

        for(let i = 0; 10 > i; i++) {
            await bookRepository.create({...bookBuilder, name: `${bookBuilder.name}${i}`})
        }

        const sut = new ReturnAllBooksUseCase(
            bookRepository
        );

        const result1 = await sut.perform({limit: String(limit)});
        
        const result2 = await sut.perform({limit: String(limit), cursor: result1.cursor});
        
        expect(result2.books).toHaveLength(limit)
    })
})