import { Request, Response } from "express"
import { registerBookUseCase, returnAllBooksUseCase } from "./abstraction"

export class BookController {

    async get(request: Request, response: Response) {

        const limit = request.query.limit as string;
        const cursor = request.query.cursor as string;
        const search = request.query.q as string;
        
        const result = await returnAllBooksUseCase.perform({limit, cursor, search}) 

        return response.json(result)
    }

    async create(request: Request, response: Response) {

        const {
            name,
            description,
            amount,
            publish_date
        } = request.body

        const result = await registerBookUseCase.perform({
            name, 
            description, 
            amount, 
            publish_date
        })

        return response.json(result)
    }
}