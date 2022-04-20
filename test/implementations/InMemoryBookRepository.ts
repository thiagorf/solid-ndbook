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

    async findAll() {
        return this.book
    }

    async paginate(limit: number){
       const books = this.book.slice(0, limit);

       return {
           books,
           cursor: books[(limit - 1)].id
       }
    }

    async moveCursor(limit: number, cursor: string){

        const index = this.book.findIndex(item => item.id === cursor)
        
        const books = this.book.slice((index + 1), ( limit + index + 1));

        return {
            books,
            cursor: books[(limit - 1)].id
        }
    }
}