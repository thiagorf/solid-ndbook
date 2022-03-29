import { RegisterBookUseCase } from "../../../src/domain/useCases/RegisterBookUseCase";
import { BookBuilder } from "../../doubles/builders/BookBuilder";
import { InMemoryBookRepository } from "../../implementations/InMemoryBookRepository";
import { InMemoryStockRepository } from "../../implementations/InMemoryStockRepository";


//Precisa desta linha para fazer match de datas na hora de comparar objetos
jest.useFakeTimers('modern').setSystemTime(new Date(2020, 9, 1, 7));

const makeSut = () => {
    const bookRepository = new InMemoryBookRepository();
    const stockRepository = new InMemoryStockRepository();

    const sut = new RegisterBookUseCase(bookRepository, stockRepository);

    return {
        bookRepository,
        stockRepository,
        sut
    }
}


describe("Register Book Use Case", () => {
    test("Should be able to register a book", async () => {
        const amount = 5;

        const bookBuilder = BookBuilder.aBook().build();
        const {
            name,
            description,
            publish_date
        } = bookBuilder;

        const { sut } = makeSut()

        const response = await sut.perform({
            name,
            description,
            publish_date,
            amount
        });

        expect(response).toMatchObject(bookBuilder);
    })

    test("Should not be able to register a book if the name is already used", async () => {
        const { sut, bookRepository, stockRepository } = makeSut();

        const bookBuilder = BookBuilder.aBook().build();
        const {
            name,
            description,
            publish_date
        } = bookBuilder


        const stock = await stockRepository.create();
        const book = await bookRepository.create({...bookBuilder, stock_id: stock.id});
    
        expect(async () => {
            await sut.perform({
                name,
                description,
                publish_date,
                amount: 1
            })
        }).rejects.toThrow("Book Already exists")
        
    })
})