import { Book } from "../../src/domain/entities/Book";
import { BookProps, IBookRepository } from "../../src/domain/interfaces/BookRepository";



export class InMemoryBookRepository implements IBookRepository{
    
    book: Book[] = []
    private id: number = 0

    async create({name, description, publish_date, stock_id}: BookProps): Promise<Book> {
        
        const book: Book = {
            name,
            description,
            publish_date,
            stock_id,
            created_at: new Date(),
            id: this.id.toString(),
        }      

        this.id++;

        this.book.push(book);

        return await this.findBookBy(book.id);

    }

    async findByName(name: string): Promise<Book> {
        const book = this.book.find(book => book.name === name)

        return book;
    }

    async findBookBy(book_id: string): Promise<Book> {
        const book = this.book.find(book => book.id === book_id)

        return book;
    }
}