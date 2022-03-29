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
} 