import { Request, Response } from "express";
import { finishRentUseCase, rentBookUseCase } from "./abstraction";


export class RentController {
    async create(request: Request, response: Response) {

        const {
            user_id,
            book_id,
            end_date,
            rent_date
        } = request.body;

        const result = await rentBookUseCase.perform({
            user_id,
            book_id,
            end_date,
            rent_date
        })

        return response.json(result);
    }

    async finish(request: Request, response: Response) {
        const rent_id = request.params.id

        const result = await finishRentUseCase.perform(rent_id);

        return response.json(result);
    }
}