import { PaginateResources } from "../until"

interface QueryParams {
    limit: string;
    cursor?: string
    search?: string;
}

export class ReturnAllBooksUseCase {
    
    async perform({limit = "2", cursor, search}: QueryParams) {
        const qty = Number(limit)

        const paginateResource = new PaginateResources({
            limit: qty,
            cursor,
            search
        })

        return paginateResource.paginate()
    }
}