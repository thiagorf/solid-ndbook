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

    public build() {
        return this.user;
    }
}