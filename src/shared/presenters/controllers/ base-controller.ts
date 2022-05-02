import { Request, Response } from "express"


/*
    success 200 payload 
    fail 400 error message

*/

export abstract class BaseController {

    abstract handle(request: Request, response: Response): Promise<Response>

    success<T>(response: Response, resource?: T) {

        if(!!resource) {
            return response.status(200).json(resource)
        }
        return response.sendStatus(200)
    }

    fail(response: Response, error: Error) {
        return response.status(500).json({
            message: error.toString()
        })
    }
}