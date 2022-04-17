import express, {json, NextFunction, Request, Response, } from "express";
import "express-async-errors";
import { bookRouter } from "./routes/books/book-routes";
import { rentRouter } from "./routes/rents/rent-routes";
import { userRouter } from "./routes/users/user-routes";

const app = express();

app.use(json())
app.use("/books", bookRouter);
app.use("/users", userRouter);
app.use("/rents", rentRouter);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    return response.status(500).json({
        msg: err.message
    })
})



export default app