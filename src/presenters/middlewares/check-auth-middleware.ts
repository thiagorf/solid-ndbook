import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function checkAuthMiddleware(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers["authorization"]

    if(!authHeader) {
        return response.status(403).json({
            message: "Auth token is not present in the request header"
        })
    }

    const [, token] = authHeader.split(' ')

    try {
        const validToken = jwt.verify(token, process.env.JWT_SECRET)

        next();
    } catch (error) {
        return response.status(403).json({
            message: "Invalid token provided"
        })
    }
   

    

}