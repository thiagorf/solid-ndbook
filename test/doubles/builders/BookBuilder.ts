import { Book } from "../../../src/domain/entities/Book"

export class BookBuilder {

    private book: Book = {
        id: "0",
        name: "Clean Architecture",
        description: "Uncle bob book",
        publish_date: new Date(),
        created_at: new Date(),
        stock_id: "0"
    }

    static aBook(): BookBuilder {
        return new BookBuilder()
    }

    public build() {
        return this.book
    }

}