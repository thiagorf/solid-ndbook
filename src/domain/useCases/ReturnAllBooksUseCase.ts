import { paginate } from "../until/paginate"

interface QueryParams {
    limit: string;
    cursor?: {
        next?: "",
        previous?: ""
    };
    search?: string;
}

export class ReturnAllBooksUseCase {
    
    async perform({limit = "2", cursor, search}: QueryParams) {
        const qty = Number(limit)


        return await paginate({limit: qty, cursor, search});
    }
}