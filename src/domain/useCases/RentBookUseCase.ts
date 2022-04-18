import { DateRequirements } from "../../adapters/DateRequirements";
import { Book } from "../entities/Book";
import { IBookRepository } from "../interfaces/BookRepository";
import { IRentRepository } from "../interfaces/RentRepository";
import { IStockRepository } from "../interfaces/StockRepository";
import { IUserRepository } from "../interfaces/UserRepository";
import { Validate } from "../validation";

type RentRequest = {
    user_id: string;
    book_id: string;
    rent_date: Date;
    end_date: Date;
}

export class RentBookUseCase {
    constructor(
        private rentRepository: IRentRepository,
        private bookRepository: IBookRepository,
        private userRepository: IUserRepository,
        private stockRepository: IStockRepository,
        private dateAdpter: DateRequirements
    ) {}

    async perform({
        user_id,
        book_id,
        end_date,
        rent_date
    }: RentRequest) {

        const formatedEndDate = new Date(end_date).toISOString()
        const formatedRentDate = new Date(rent_date).toISOString()

        Validate.input({formatedEndDate, formatedRentDate})

        const { bookIsProvided } = await this.checkRequirementsForRent(book_id, user_id)

        const bookAmount = await this.checkAvailableBookAmount(bookIsProvided)

        await this.checkDatesProvided(rent_date, end_date)
        
        const userRents = await this.rentRepository.findInProgressRentByUser(user_id)
        
        if(userRents) {
            const userHaveThreeRents = (Object.keys(userRents).length === 3) 
            || (Object.keys(userRents).length > 3)
            
            if(userHaveThreeRents) throw new Error("User already have three rents")
        }

        const rent = await this.rentRepository.create({
            user_id,
            book_id,
            rent_date,
            end_date
        })

        await this.stockRepository.decreaseAmount(bookAmount.id)

        return rent;
    }

    private async checkRequirementsForRent(book_id: string, user_id:string) {
        const bookIsProvided = await this.bookRepository.findBookBy(book_id)
        if(!bookIsProvided) throw new Error("Invalid Book")
        
        const userIsProvided = await this.userRepository.findUserBy(user_id);
        if(!userIsProvided) throw new Error("Invalid User");

        return {
            bookIsProvided,
            userIsProvided
        }
    }

    private async checkAvailableBookAmount(book: Book) {
        const bookAmount = await this.stockRepository.findStockBy(book.stock_id)
        const amountIsZero = bookAmount.amount === 0;

        if(amountIsZero) throw new Error("Unavailable Book")

        return bookAmount;
    }

    private async checkDatesProvided(rent_date: Date, end_date: Date) {
        //2022, 3, 30 data generica para testar
        //possivel extração da verifição de datas para uma classe própria
        const result = this.dateAdpter.checkDateDifference(rent_date, end_date)
        
        if(result < 0) throw new Error("Invalid Date")  

        if(result > 21) throw new Error("Cannot Rent a book for more than three weeks")
    }
}