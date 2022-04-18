import jwt from "jsonwebtoken"
import { compare,  } from "bcrypt"
import { IUserRepository } from "../interfaces/UserRepository";


type Login = {
    email: string;
    password: string
}


export class AuthenticateUserUseCase {

    constructor (
        private userRepository: IUserRepository
    ) {}

    async perform({email,password }: Login)  {

        const userExists = await this.userRepository.findByEmail(email)
        
        if(!userExists) throw new Error("Invalid User")

        const checkPassword = await compare(password, userExists.password)

        if(!checkPassword) throw new Error("Invalid email or password")
        
        const secretKey = process.env.JWT_SECRET  || "secret";
        
        if(!secretKey) throw new Error("Invalid token signature")

        const token = jwt.sign({
            email
        },
        secretKey
        , 
        {
            expiresIn: "1h",

        })

        return {
            token
        };
   }
}