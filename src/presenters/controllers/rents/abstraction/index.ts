import { DayjsAdapter } from "../../../../adapters/DayjsAdapter";
import { FinishRentUseCase } from "../../../../domain/useCases/FinishRentUseCase";
import { RentBookUseCase } from "../../../../domain/useCases/RentBookUseCase";
import { PrismaBookRepository } from "../../../repositories/prisma-repositories/book-repository";
import { PrismaRentRepository } from "../../../repositories/prisma-repositories/rent-repository";
import { PrismaStockRepository } from "../../../repositories/prisma-repositories/stock-repository";
import { PrismaUserRepository } from "../../../repositories/prisma-repositories/user-repository";


const rentRepository = new PrismaRentRepository();
const userRepository = new PrismaUserRepository()
const bookRepository = new PrismaBookRepository();
const stockRepository = new PrismaStockRepository()
const dateProvider = new DayjsAdapter()

const rentBookUseCase = new RentBookUseCase(
    rentRepository,
    bookRepository,
    userRepository,
    stockRepository,
    dateProvider

)

const finishRentUseCase = new FinishRentUseCase(
    rentRepository,
    bookRepository,
    stockRepository
)

export {
    rentBookUseCase,
    finishRentUseCase
}