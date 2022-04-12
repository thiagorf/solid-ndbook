import { Request, Response } from "express"

export class BookController {
    async get(request: Request, response: Response) {

        return response.json()
    }
}