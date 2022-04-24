import { RegisterBookUseCase } from "../../../../domain/useCases/RegisterBookUseCase";
import { ReturnAllBooksUseCase } from "../../../../domain/useCases/ReturnAllBooksUseCase";
import { PrismaBookRepository } from "../../../repositories/prisma-repositories/book-repository";
import { PrismaStockRepository } from "../../../repositories/prisma-repositories/stock-repository";


const bookRepository = new PrismaBookRepository()
const stockRepository = new PrismaStockRepository()


const returnAllBooksUseCase = new ReturnAllBooksUseCase()

const registerBookUseCase = new RegisterBookUseCase(
    bookRepository,
    stockRepository
)

export {
    returnAllBooksUseCase,
    registerBookUseCase
}