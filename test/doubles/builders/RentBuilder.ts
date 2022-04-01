import { Rent } from "../../../src/domain/entities/Rent";
import { BookBuilder } from "./BookBuilder";
import { UserBuilder } from "./UserBuilder";



export class RentBuilder {
    private bookBuilder = BookBuilder.aBook().build();
    private userBuilder = UserBuilder.aUser().build();

    private rent: Rent = {
        id: "0",
        book_id: this.bookBuilder.id,
        user_id: this.userBuilder.id,
        end_date: new Date(),
        rent_date: new Date(),
        inProgress: true
    }

    static aRent() {
        return new RentBuilder()
    }

    public build() {
        return this.rent;
    }
}