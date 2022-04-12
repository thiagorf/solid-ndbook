import { IBookRepository } from "../interfaces/BookRepository";



export class ReturnAllBooksUseCase {
    constructor(
        private bookRepository: IBookRepository
    ) {}

    async perform() {
        const books = await this.bookRepository.findAll()

        return books;
    }
}