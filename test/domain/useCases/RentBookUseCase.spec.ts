import { DayjsAdapter } from "../../../src/adapters/DayjsAdapter";
import { RentBookUseCase } from "../../../src/domain/useCases/RentBookUseCase"
import { BookBuilder } from "../../doubles/builders/BookBuilder";
import { RentBuilder } from "../../doubles/builders/RentBuilder";
import { UserBuilder } from "../../doubles/builders/UserBuilder";
import { InMemoryBookRepository } from "../../implementations/InMemoryBookRepository";
import { InMemoryRentRepository } from "../../implementations/InMemoryRentRepository";
import { InMemoryStockRepository } from "../../implementations/InMemoryStockRepository";
import { InMemoryUserRepository } from "../../implementations/InMemoryUserRepository";

jest.useFakeTimers('modern').setSystemTime(new Date(2022, 2, 1, 7));

const makeSut = () => {
    const rentRepository = new InMemoryRentRepository();
    const bookRepository = new InMemoryBookRepository();
    const userRepository = new InMemoryUserRepository();
    const stockRepository = new InMemoryStockRepository();
    const dateAdpter = new DayjsAdapter(); 

    const sut = new RentBookUseCase(
        rentRepository, 
        bookRepository, 
        userRepository,
        stockRepository,
        dateAdpter
    );

    return {
        sut, 
        rentRepository,
        bookRepository,
        userRepository,
        stockRepository
    }
}



describe("Rent Book Use Case", () => {
    /*
    Parametros
    use_id, book_id, rent_date, end_date

    Retorna aluguel criado ou lança um erro
*/
    test("Should be able to rent a book", async () => {
        const rentBuilder = RentBuilder.aRent().build();
        const bookBuilder = BookBuilder.aBook().build();
        const userBuilder = UserBuilder.aUser().build();

        const { sut, bookRepository, userRepository, stockRepository } = makeSut();
        
        const stock = await stockRepository.create(4);
        await bookRepository.create({...bookBuilder, stock_id: stock.id});
        await userRepository.create(userBuilder)

        const response = await sut.perform({...rentBuilder, end_date: new Date(2022, 2, 20)})

        expect(response).toMatchObject({...rentBuilder, end_date: new Date(2022, 2, 20)})
    })

    test("Should not be able to rent a invalid book", async () => {
        const rentBuilder = RentBuilder.aRent().build();
        
        const { sut } = makeSut();

        expect(async () => {
            await sut.perform(rentBuilder);
        }).rejects.toThrow("Invalid Book");
    
    })
    
    test("Should not be able to rent a book with a invalid user", async () => {
        const rentBuilder = RentBuilder.aRent().build();
        const bookBuilder = BookBuilder.aBook().build();

        const { sut, bookRepository } = makeSut();

        await bookRepository.create(bookBuilder);

        expect(async () => {
            await sut.perform(rentBuilder)
        }).rejects.toThrow("Invalid User");
    })

    test("Should not be able to rent a book if the amount is zero", async () => {
        const rentBuilder = RentBuilder.aRent().build();
        const bookBuilder = BookBuilder.aBook().build();
        const userBuilder = UserBuilder.aUser().build();

        const { sut, bookRepository, userRepository, stockRepository } = makeSut();

        const stock = await stockRepository.create(0);
        await bookRepository.create({...bookBuilder, stock_id: stock.id});
        await userRepository.create(userBuilder);


        expect(async () => {
            await sut.perform(rentBuilder)
        }).rejects.toThrow("Unavailable Book")

    })

    test("Should be able to decrease the amount of book after a successful rent", async () => {
        const rentBuilder = RentBuilder.aRent().build();
        const bookBuilder = BookBuilder.aBook().build();
        const userBuilder = UserBuilder.aUser().build();

        const { sut, bookRepository, userRepository, stockRepository } = makeSut();

        const stock = await stockRepository.create(4);
        
        await bookRepository.create({...bookBuilder, stock_id: stock.id});
        await userRepository.create(userBuilder);

        await sut.perform({...rentBuilder, end_date: new Date(2022, 2, 20)})

        const actualValue = await stockRepository.findStockBy(stock.id)
        
        expect(actualValue.amount).toBe(stock.amount--)
    })

    test("Should not be able to rent a book for more than three weeks", async () => {
        const rentBuilder = RentBuilder.aRent().build();
        const bookBuilder = BookBuilder.aBook().build();
        const userBuilder = UserBuilder.aUser().build();

        const { sut, bookRepository, userRepository, stockRepository } = makeSut();

        const stock = await stockRepository.create(4);
        
        await bookRepository.create({...bookBuilder, stock_id: stock.id});
        await userRepository.create(userBuilder);


        expect(async () => {
            await sut.perform({...rentBuilder, end_date: new Date(2022, 3, 30)})
        }).rejects.toThrow("Cannot Rent a book for more than three weeks")
    })

    test("Should not be able to rent a book with invalid date", async () => {
        const rentBuilder = RentBuilder.aRent().build();
        const bookBuilder = BookBuilder.aBook().build();
        const userBuilder = UserBuilder.aUser().build();

        const { sut, bookRepository, userRepository, stockRepository } = makeSut();

        const stock = await stockRepository.create(4);
        
        await bookRepository.create({...bookBuilder, stock_id: stock.id});
        await userRepository.create(userBuilder);

        expect(async () => {
            await sut.perform({...rentBuilder, end_date: new Date(2021, 2, 20)})
        }).rejects.toThrow("Invalid Date")
    })

    test("Should not be able to rent a book if the user already have three rent", async () => {
        const rentBuilder = RentBuilder.aRent().build();
        const bookBuilder = BookBuilder.aBook().build();
        const userBuilder = UserBuilder.aUser().build();

        const { 
            sut, 
            bookRepository, 
            userRepository, 
            stockRepository, 
            rentRepository 
        } = makeSut();

        const stock = await stockRepository.create(4);
        
        await bookRepository.create({...bookBuilder, stock_id: stock.id});
        await userRepository.create(userBuilder);

        await rentRepository.create({...rentBuilder, end_date: new Date(2022, 2, 20)})
        await rentRepository.create({...rentBuilder, end_date: new Date(2022, 2, 20)})
        await rentRepository.create({...rentBuilder, end_date: new Date(2022, 2, 20)})

        expect(async () => {
            await sut.perform({...rentBuilder, end_date: new Date(2022, 2, 20)})
        }).rejects.toThrow("User already have three rents")
    });
})