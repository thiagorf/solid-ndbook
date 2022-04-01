import { IBookRepository } from "../interfaces/BookRepository";
import { IRentRepository } from "../interfaces/RentRepository";
import { IStockRepository } from "../interfaces/StockRepository";

export class FinishRentUseCase {

    constructor(
        private rentRepository: IRentRepository,
        private bookRepository: IBookRepository,
        private stockRepository: IStockRepository
    ) {}

    async perform(rent_id: string) {

        const rent = await this.rentRepository.findRentBy(rent_id)
        if(!rent) throw new Error("Invalid Rent")

        await this.rentRepository.finishRent(rent)
        //Book e Stock sempre terão o mesmo id, talvez essa linha seja aceitavel
        const book = await this.bookRepository.findBookBy(rent.book_id);
        await this.stockRepository.increaseAmount(book.stock_id)

        return rent;
    }
}