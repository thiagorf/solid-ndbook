import { hash, hashSync } from "bcrypt";
import { User } from "../../../src/domain/entities/User";



export class UserBuilder {

    private user: User = {
        id: "0",
        name: "Thiago",
        email: "test@gmail.com",
        password: "123456"
    }

    static aUser() {
        return new UserBuilder();
    }

    public withHashPassword() {
        this.user.password = hashSync("123456", 8)

        return this
    }

    public build() {
        return this.user;
    }
}