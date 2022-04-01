import { Stock } from "../entities/Stock";



export interface IStockRepository {
    findStockBy(stock_id: string): Promise<Stock>
    create(amount: number): Promise<Stock>
    updateStockAmountForBook(stock: Stock): Promise<void>
    decreaseAmount(stock_id: string): Promise<Stock>
    increaseAmount(stock_id: string): Promise<Stock>
}