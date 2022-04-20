import prisma from "../../infra/prisma-client";
import { IBookRepository } from "../interfaces/BookRepository";

interface QueryParams {
    limit: string;
    cursor?: string
}

export class ReturnAllBooksUseCase {
    constructor(
        private bookRepository: IBookRepository
    ) {}

    async perform({limit = "2", cursor}: QueryParams) {

        //KeySet Pagination or cursor pagination
        const qty = Number(limit)

        if(!cursor) {
            
            const books  = await this.bookRepository.paginate(qty)

            return books;
        }

        const books = await this.bookRepository.moveCursor(qty, cursor)

        return books
        
    }
}