import { DateRequirements } from "./DateRequirements";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc)

export class DayjsAdapter implements DateRequirements {
    checkDateDifference(rent_date: Date, end_date: Date) {
        const compare = dayjs(end_date).diff(rent_date, "days")

        return compare
    }

}