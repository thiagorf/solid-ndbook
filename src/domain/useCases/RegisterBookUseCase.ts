import { IBookRepository } from "../interfaces/BookRepository";
import { IStockRepository } from "../interfaces/StockRepository";
import { Validate } from "../validation"

type RequestBookProps = {
    name: string;
    description: string;
    publish_date: Date;
    amount: number
}

export class RegisterBookUseCase {

    constructor(
        private bookRepository: IBookRepository,
        private stockRepository: IStockRepository
    ) {}

    async perform({
        name,
        description,
        publish_date,
        amount
    }: RequestBookProps) {

        const formatedDate = new Date(publish_date).toISOString()

        //amount can be optional
        Validate.input({name, description, formatedDate, amount})

        const bookAlreadyExists = await this.bookRepository.findByName(name);

        if(bookAlreadyExists) {
            throw new Error("Book Already exists")
        }

        const stock = await this.stockRepository.create(amount)
        const book = await this.bookRepository.create({
            name,
            description,
            publish_date,
            stock_id: stock.id
        })

        return book;
    }

}