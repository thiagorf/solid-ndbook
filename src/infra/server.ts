import express, {json, NextFunction, Request, Response, } from "express";
import { rateLimit } from "express-rate-limit";
import "express-async-errors";
import { bookRouter } from "./routes/books/book-routes";
import { rentRouter } from "./routes/rents/rent-routes";
import { userRouter } from "./routes/users/user-routes";
import { checkAuthMiddleware } from "../presenters/middlewares/check-auth-middleware";


const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
	max: 10, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const app = express();

app.use(json())
app.use(limiter)
app.use("/books", checkAuthMiddleware, bookRouter);
app.use("/users", userRouter);
app.use("/rents", rentRouter);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    return response.status(500).json({
        msg: err.message
    })
})



export default app