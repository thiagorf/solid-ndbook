import express, {json} from "express";
import { bookRouter } from "./routes/books/book-routes";
const app = express();

app.use(json())
app.use("/books", bookRouter)


export default app