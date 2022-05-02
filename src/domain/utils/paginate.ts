import prisma from "../../infra/prisma-client";
import { Book } from "../entities/Book";
import { decode, encode } from "."

interface QueryParams {
    limit: number;
    cursor?: string;
    search?: string;
}


export class PaginateResources {
    private limit: number;
    private cursor: string;
    private search: string

    constructor(requiredData: QueryParams) {
        
        this.limit = requiredData.limit;
        this.cursor = requiredData.cursor
        this.search = requiredData.search
    }

    async paginate() {
        const result = await this.paginateNextPage();

        return result;
    }

    private async paginateNextPage() {

        if(!this.cursor && !this.search) {
            const books = await prisma.book.findMany({
                take: (this.limit + 1),
                orderBy: {
                    created_at: "asc"
                }
            });
    
            return this.showProperResult(books);
        }

        const books = await this.flowControl()

        return this.showProperResult(books)
        
    }

    private async flowControl() {
        if(this.cursor && this.search) {
            const lastCursor = await this.checkCursor()

            const textMatchElement = await this.fullTextSeachWithCursor(lastCursor)

            return textMatchElement;
        }

        if(this.cursor) {
            const lastCursor = await this.checkCursor()

            const nextBooks = await this.nextPageResults(lastCursor);

            return nextBooks
        }


        if(this.search) {
            const textMatchElement = await this.fullTextSearch();

            return textMatchElement
        }
    }

    private async fullTextSearch() {
        const books = await prisma.$queryRaw`
            SELECT id, name, description, publish_date, created_at, stock_id
            FROM "Book"
            WHERE "textsearch" @@ to_tsquery(${this.search + ':*'})
            ORDER BY "created_at" ASC          
            LIMIT ${(this.limit + 1)}
        `

        return books as Book[];
    }

    private async fullTextSeachWithCursor(lastCursor: Book) {
        const books = await prisma.$queryRaw`
            SELECT id, name, description, publish_date, created_at, stock_id
            FROM "Book"
            WHERE "created_at" > ${lastCursor.created_at} AND
            "textsearch" @@ to_tsquery(${this.search + ':*'})
            ORDER BY "created_at" ASC 
            LIMIT ${(this.limit + 1)}
        `

        return books as Book[];
    }

    private showProperResult(books: Book[]) {

        if(books.length > this.limit) {

            const formatedResult = books.slice(0, this.limit)
            const lastElement = formatedResult.slice(-1)
            const opaqueCursor = encode(lastElement[0].id)

            return {
                books: formatedResult,
                cursor: opaqueCursor
            }
        }

        return {
            books: books
        }
    }



    private async nextPageResults(lastResultCursor: Book) {
        const books = await prisma.book.findMany({
            take: (this.limit + 1),
            where: {
                created_at: {
                    gt: lastResultCursor.created_at
                }
            },
            orderBy: {
                created_at: "asc"
            }
        })

        return books
    }

    private async checkCursor() {
        const actualCursor = await prisma.book.findUnique({
            where: {
                id: decode(this.cursor)
            }
        });

        if(!actualCursor) {
            throw new Error("Invalid cursor")
        }

        return actualCursor
    }

}






