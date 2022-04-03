import { hash, hashSync } from "bcrypt";
import { User } from "../../../src/domain/entities/User";



export class UserBuilder {

    private user: User = {
        id: "0",
        name: "Thiago",
        email: "test@gmail.com",
        password: "1234"
    }

    static aUser() {
        return new UserBuilder();
    }

    public withHashPassword() {
        this.user.password = hashSync("1234", 8)

        return this
    }

    public build() {
        return this.user;
    }
}