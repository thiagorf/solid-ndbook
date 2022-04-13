import { Request, Response} from "express";
import { authenticateUserUseCase, registerUserUseCase } from "./abstraction";



export class UserController {

    async post(request: Request, response: Response) {
        const {
            name,
            email,
            password
        } = request.body;

        const result = await registerUserUseCase.perform({
            name,
            email,
            password
        })

        return response.json(result)
    }

    async authenticate(request: Request, response: Response) {
        const {
            email,
            password
        } = request.body;

        const result = await authenticateUserUseCase.perform({
            email,
            password
        })

        return response.json(result)
    }
} 