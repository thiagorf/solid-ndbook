import { FinishRentUseCase } from "../../../src/domain/useCases/FinishRentUseCase"
import { BookBuilder } from "../../doubles/builders/BookBuilder";
import { RentBuilder } from "../../doubles/builders/RentBuilder";
import { InMemoryBookRepository } from "../../implementations/InMemoryBookRepository";
import { InMemoryRentRepository } from "../../implementations/InMemoryRentRepository";
import { InMemoryStockRepository } from "../../implementations/InMemoryStockRepository";


const makeSut = () => {
    const stockRepository = new InMemoryStockRepository();
    const bookRepository = new InMemoryBookRepository();
    const rentRepository = new InMemoryRentRepository();

    const sut = new FinishRentUseCase(
        rentRepository,
        bookRepository,
        stockRepository

    );

    return {
        sut,
        rentRepository,
        bookRepository,
        stockRepository
    }
}

describe("Finish Rent Use Case", () => {

    test("Should be able to finish the rent", async () => {
        const finishRentBuilder = RentBuilder.aRent().withFinishedProgress().build()
        const bookBuilder = BookBuilder.aBook().build()

        const {
            sut,
            rentRepository,
            stockRepository,
            bookRepository
        } = makeSut()
        
        const rent = await rentRepository.create(finishRentBuilder);

        
        await stockRepository.create()
        await bookRepository.create(bookBuilder)
        const response = await sut.perform(rent.id)

        expect(response).toMatchObject(finishRentBuilder);
    })

    test("Should not be able to finish a rent that don't exists", async () => {
        const {
            sut,
            rentRepository,
            stockRepository,
            bookRepository
        } = makeSut()

        expect(async () => {
            await sut.perform("123")
        }).rejects.toThrow("Invalid Rent")
    })

    test("Should be able to increease the book amount in stock after finish the rent", async () => {
        const finishRentBuilder = RentBuilder.aRent().withFinishedProgress().build()
        const bookBuilder = BookBuilder.aBook().build();

        const {
            sut,
            rentRepository,
            stockRepository,
            bookRepository
        } = makeSut()

        const stock = await stockRepository.create();
        const book = await bookRepository.create(bookBuilder);
 

        const rent = await rentRepository.create(finishRentBuilder)
      
        

        const response = await sut.perform(rent.id)

        const expectedAmount = await stockRepository.findStockBy(stock.id);
        
        expect(expectedAmount.amount).toBe(stock.amount++)
    })

    test("Should be able to change inProgress field after finish the rent", async () => {
        const finishRentBuilder = RentBuilder.aRent().withFinishedProgress().build()
        const bookBuilder = BookBuilder.aBook().build();

        const {
            sut,
            rentRepository,
            stockRepository,
            bookRepository
        } = makeSut()

        await stockRepository.create();
        const book = await bookRepository.create(bookBuilder);
        

        const rent = await rentRepository.create(finishRentBuilder)
        
        const response = await sut.perform(rent.id)

        const { 
            inProgress: expectedProgress 
        } = await rentRepository.findRentBy(rent.id);

        expect(expectedProgress).toBe(false)
    })
})