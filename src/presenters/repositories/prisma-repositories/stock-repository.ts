import { Stock } from "../../../domain/entities/Stock";
import { IStockRepository } from "../../../domain/interfaces/StockRepository";
import prisma from "../../../infra/prisma-client";



export class PrismaStockRepository implements IStockRepository {
    async findStockBy(stock_id: string): Promise<Stock> {
        const stock = await prisma.stock.findUnique({
            where: {
                id: stock_id
            }
        });

        return stock;
    }

    async create(amount: number = 1): Promise<Stock> {

        const stock = await prisma.stock.create({
            data: {
                amount
            }
        });

        return stock;
    }

    async updateStockAmountForBook(stock: Stock): Promise<void> {

        const updatedStock = await prisma.stock.update({
            where: {
                id: stock.id
            },
            data: {
                ...stock
            }
        });

    }

    async decreaseAmount(stock_id: string): Promise<Stock> {
        const stock = await prisma.stock.update({
            where: {
                id: stock_id
            },
            data: {
                amount: {
                    decrement: 1
                }
            }
        });

        return stock;
    }

    async increaseAmount(stock_id: string): Promise<Stock> {
        const stock = await prisma.stock.update({
            where: {
                id: stock_id
            },
            data: {
                amount: {
                    increment: 1
                }
            }
        });

        return stock
    }

}