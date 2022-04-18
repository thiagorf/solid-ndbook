import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken"
import prisma from "../../infra/prisma-client";


async function callRepository(sub: string) {

    const user = await prisma.user.findFirst({
        where: {
            email: sub,
            AND: {
                role: "ADMIN"
            }
        }
    });

    return user;
    
   
}


export async function checkAdminMiddleware(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers["authorization"]

    if(!authHeader) {
        return response.status(403).json({
            message: "Auth token is not present in the request header"
        })
    }

    const [, token] = authHeader.split(' ')


    try {
        const { sub } = jwt.verify(token, process.env.JWT_SECRET)   

        //const user = callRepository(sub as string)

        const user =  await prisma.user.findFirst({
            where: {
                email: sub as string,
                AND: {
                    role: "ADMIN"
                }
            }
        });

        
        if(!user) {
            return response.status(403).json({
                message: "Unauthorized"
            })
        }

        next();
    } catch (error) {
        return response.status(403).json({
            message: error
        })
    }
}