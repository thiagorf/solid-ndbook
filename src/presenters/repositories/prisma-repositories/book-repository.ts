import { Book } from "../../../domain/entities/Book";
import prisma from "../../../infra/prisma-client";
import { BookProps, IBookRepository } from "../../../domain/interfaces/BookRepository";



export class PrismaBookRepository implements IBookRepository {

    async create({ name, description, publish_date, stock_id }: BookProps): Promise<Book> {
        const book = await prisma.book.create({
            data: {
                name,
                description,
                publish_date,
                stock_id
            }
        })

        return book;
    }

    async findByName(name: string): Promise<Book> {
        const book = await prisma.book.findFirst({
            where: {
                name
            }
        });

        return book
    }

    async findBookBy(book_id: string): Promise<Book> {

        const book = await prisma.book.findUnique({
            where: {
                id: book_id
            }
        });

        return book;
    }
    async findAll(): Promise<Book[]> {
        const books = await prisma.book.findMany();

        return books;
    }

}