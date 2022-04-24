import prisma from "../../infra/prisma-client";
import { Book } from "../entities/Book";
import { Buffer } from "buffer"

interface QueryParams {
    limit: number;
    cursor?: string;
    search?: string;
}

interface RequestQuery {
    limit: number;
    cursor: {
        next?: "",
        previous?: ""
    };
    search?: string;
}

const formatResult = (books: Book[], limit: number) => {
    const takeBooks = books.slice(0, limit);
    const opaqueCursor = Buffer.from(takeBooks[limit - 1].id).toString("base64");

    return {
        books: takeBooks,
        cursor: opaqueCursor
    }
}

const decodeBuffer = (cursor: string) => Buffer.from(cursor, "base64").toString("ascii");



const paginateNextPage = async ({limit, cursor, search}: QueryParams) => {

    if(cursor && search) {
        const previousCursor = await prisma.book.findUnique({
            where: {
                id: decodeBuffer(cursor)
            }
        })

        const books: Book[] = await prisma.$queryRaw`
        SELECT id, name, description, publish_date, created_at, stock_id 
        FROM "Book"
        WHERE "created_at" > ${previousCursor.created_at} AND
        "textsearch" @@ to_tsquery(${search + ':*'})
        LIMIT ${limit + 1}
        ORDER BY "created_at" ASC
    `;

        return formatResult(books, limit)
    }

    if(cursor && !search) {

        const previousCursor = await prisma.book.findUnique({
            where: {
                id: decodeBuffer(cursor)
            }
        })

        const books: Book[] = await prisma.$queryRaw`
            SELECT id, name, description, publish_date, created_at, stock_id 
            FROM "Book"
            WHERE "created_at" > ${previousCursor.created_at}
            LIMIT ${limit + 1}
        `;

        return formatResult(books, limit)
    }

    if(!cursor && search) {
        const books: Book[] = await prisma.$queryRaw`
            SELECT id, name, description, publish_date, created_at, stock_id  
            FROM "Book"
            WHERE "textsearch" @@ to_tsquery(${search + ':*'})
            LIMIT ${limit + 1}
            ORDER BY "created_at" ASC
        `;

        return formatResult(books, limit)
    }

    const books = await prisma.book.findMany({
        orderBy: {
            created_at: "asc"
        },
        take: (limit + 1)
    })

    return formatResult(books, limit)

}

const paginatePreviousPage = async ({limit, cursor, search}: QueryParams) => {

    if(cursor && search) {
        const previousCursor = await prisma.book.findUnique({
            where: {
                id: decodeBuffer(cursor)
            }
        })

        const books: Book[] = await prisma.$queryRaw`
        SELECT id, name, description, publish_date, created_at, stock_id  
        FROM "Book"
        WHERE "created_at" < ${previousCursor.created_at} AND
        "textsearch" @@ to_tsquery(${search + ':*'})
        LIMIT ${limit + 1}
        ORDER BY "created_at" ASC
    `;

        return formatResult(books, limit)
    }

    if(cursor && !search) {

        const previousCursor = await prisma.book.findUnique({
            where: {
                id: decodeBuffer(cursor)
            }
        })
        
        const books: Book[] = await prisma.$queryRaw`
            SELECT id, name, description, publish_date, created_at, stock_id 
            FROM "Book"
            WHERE "created_at" < ${previousCursor.created_at}
            LIMIT ${limit + 1}
        `;

        return formatResult(books, limit)
    }

    if(!cursor && search) {
        const books: Book[] = await prisma.$queryRaw`
            SELECT id, name, description, publish_date, created_at, stock_id  
            FROM "Book"
            WHERE "textsearch" @@ to_tsquery(${search + ':*'})
            LIMIT ${limit + 1}
            ORDER BY "created_at" ASC
        `;

        return formatResult(books, limit)
    }

    const books = await prisma.book.findMany({
        orderBy: {
            created_at: "asc"
        },
        take: (limit + 1)
    })

    return formatResult(books, limit)
}

export const paginate = async ({limit, cursor, search}: RequestQuery) => {

    if(cursor) {
        if(cursor.previous) {
            return await paginatePreviousPage({limit, cursor: cursor.previous, search})
        } 
    
        if(cursor.next) {
            return await paginateNextPage({limit, cursor: cursor.next, search})
        }
    }

    return await paginateNextPage({limit, cursor: "", search})
}