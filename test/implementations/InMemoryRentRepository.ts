import { Rent } from "../../src/domain/entities/Rent";
import { IRentRepository, RentProps } from "../../src/domain/interfaces/RentRepository";



export class InMemoryRentRepository implements IRentRepository {

   
    rent: Rent[] = []
    private id: number = 0;

    async create({ user_id, book_id, end_date, rent_date }: RentProps): Promise<Rent> {
        const rent: Rent = {
            id: this.id.toString(),
            user_id,
            book_id,
            rent_date,
            end_date,
            inProgress: true       
        }

        this.id++

        this.rent.push(rent);

        return this.findRentBy(rent.id);

    }

    async findRentBy(rent_id: string) {
        const rent = this.rent.find(rent => rent.id === rent_id)

        return rent
    }

    async findInProgressRentByUser(user_id: string): Promise<Rent[]> {
        const rent = this.rent.filter(rent => rent.user_id === user_id)
        .filter(rentIs => rentIs.inProgress === true)

        return rent;
    }

    //Padrao update ou um método especial para o rent
    async finishRent(rent: Rent): Promise<Rent> {
        const finishRent = this.rent.findIndex(rentItem => rentItem.id === rent.id)

        this.rent[finishRent].receive_date = new Date();
        this.rent[finishRent].inProgress = false

        return this.rent[finishRent]
    }
    
}