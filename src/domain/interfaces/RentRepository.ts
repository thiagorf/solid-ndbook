import { Rent } from "../entities/Rent";

export type RentProps = {
    user_id: string;
    book_id: string;
    rent_date: Date;
    end_date: Date
}

export interface IRentRepository {
    create({
        user_id,
        book_id,
        end_date,
        rent_date
    }:RentProps): Promise<Rent>

    findInProgressRentByUser(user_id: string): Promise<Rent[]>

    findRentBy(rent_id: string): Promise<Rent>

    finishRent(rent: Rent): Promise<Rent>
} 