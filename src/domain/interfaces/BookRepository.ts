import { Book } from "../entities/Book";

export type BookProps = {
    name: string,
    description: string,
    publish_date: Date,
    stock_id?: string
}

export interface IBookRepository {
    create({name, description, publish_date, stock_id}: BookProps): Promise<Book>
    findByName(name: string): Promise<Book>
    findBookBy(book_id: string): Promise<Book>
    
}
