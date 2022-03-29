import { User } from "../../../src/domain/entities/User";



export class UserBuilder {

    private user: User = {
        id: "0",
        name: "Thiago"
    }

    static aUser() {
        return new UserBuilder();
    }

    public build() {
        return this.user;
    }
}