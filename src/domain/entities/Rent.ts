


export interface Rent {
    id?: string;
    user_id: string;
    book_id: string;
    rent_date: Date;
    end_date: Date;
    receive_date?: Date
}