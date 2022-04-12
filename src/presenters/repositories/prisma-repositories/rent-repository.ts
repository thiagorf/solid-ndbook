import { Rent } from "../../../domain/entities/Rent";
import prisma from "../../../infra/prisma-client";
import { IRentRepository, RentProps } from "../../../domain/interfaces/RentRepository";



export class PrismaRentRepository implements IRentRepository{
    async create({ user_id, book_id, end_date, rent_date }: RentProps): Promise<Rent> {
        const rent = await prisma.rent.create({
            data: {
                user_id,
                book_id,
                end_date,
                rent_date
            }
        });

        return rent;
    }

    async findInProgressRentByUser(user_id: string): Promise<Rent[]> {
        const rent = await prisma.rent.findMany({
            where: {
                user_id,
                AND: [
                    {
                        inProgress: true
                    }
                ]
            }
        });

        return rent
    }

    async findRentBy(rent_id: string): Promise<Rent> {
        const rent = await prisma.rent.findUnique({
            where: {
                id: rent_id
            }
        });

        return rent;
    }

    async finishRent(rent: Rent): Promise<Rent> {
        const finish = await prisma.rent.update({
            where: {
                id: rent.id
            },
            data: {
                ...rent,
                receive_date: new Date(),
                inProgress: false
            }
        });
        
        return finish;
    }

}