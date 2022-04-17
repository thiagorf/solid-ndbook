import validator from "validator"

interface RegisterUserProps {
    name: string;
    email: string;
    password: string;
}


export class RegisterUserValidation {


    static validate(user: RegisterUserProps ) {
        
        const inputValidation = new RegisterUserValidation()

        inputValidation.validateEmail(user.email);
        inputValidation.validateName(user.name)
        inputValidation.validatePassword(user.password)

    }

    
    private validateName(name: string) {
        const validName = validator.isEmpty(name);

        return this.checkResult(!validName);
        
    }

    private validateEmail(email: string) {
        const validEmail = validator.isEmail(email)

        return this.checkResult(validEmail);
        
    }

    private validatePassword(password: string) {
        const validPassword = validator.isStrongPassword(password, {
            minLength: 6
        })

        return this.checkResult(validPassword)
    }

    private checkResult(result: any) {
        if(result) {
            return result
        }

        throw new Error("Invalid or imcomplete field")
    }
}