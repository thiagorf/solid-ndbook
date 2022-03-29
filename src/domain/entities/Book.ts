
//stock_id can be null?

export interface Book {
    id?: string;
    name: string;
    description: string;
    stock_id?: string;
    publish_date: Date;
    created_at?: Date;
}

 