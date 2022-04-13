import { Router } from "express";
import { BookController } from "../../../presenters/controllers/books/book-controller";

const bookController = new BookController();


const router = Router();

router.get("/", bookController.get)
router.post("/", bookController.create)


export {router as bookRouter};