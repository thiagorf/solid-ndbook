import { Stock } from "../../src/domain/entities/Stock";
import { IStockRepository } from "../../src/domain/interfaces/StockRepository";



export class InMemoryStockRepository implements IStockRepository {
    
    private id = 0
    stock: Stock[] = [];

    async findStockBy(stock_id: string) {
        const stock = this.stock.find(stock => stock.id === stock_id)

        return stock;
    }

    async create(amount: number = 1): Promise<Stock> {
        const stock: Stock = {
            id: this.id.toString(),
            amount
        }
        this.id++;

        this.stock.push(stock)

        return stock;
    }

    async updateStockAmountForBook(stock: Stock): Promise<void> {
        const stockIndex = this.stock.findIndex(stockItem => stockItem.id === stock.id)

        this.stock[stockIndex].amount = stock.amount;
    }

    async decreaseAmount(stock_id: string): Promise<Stock> {
        const stockIndex = this.stock.findIndex(stock => stock.id === stock_id)

        this.stock[stockIndex].amount--

        return this.stock[stockIndex];
    }

    async increaseAmount(stock_id: string): Promise<Stock> {
        const stockIndex = this.stock.findIndex(stock => stock.id === stock_id)

        this.stock[stockIndex].amount++

        return this.stock[stockIndex];
    }
} 