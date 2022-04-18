import validator from "validator";

interface InputObject {
    [key: string]: any
}


export class Validate {

    static instance = new Validate()

    static input(input: InputObject) {

        for(const [key, value] of Object.entries(input)) {
            switch(key) {
                case "email":
                    this.instance.validateEmail(value)
                break;
                case "password":
                    this.instance.validatePassword(value)
                break;
                case "name":
                    this.instance.validateName(value)
                break;
                case "description":
                    this.instance.validateName(value)
                break;
                case "amount":
                    this.instance.validateNumber(value)
                break;
                default:
                    this.instance.validateTimestamp(value)
                break
                
            }
        }
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
        
        //Check ideal password security measures
        const validPassword = validator.isStrongPassword(password, {
            minLength: 6,
            minSymbols: 0,
            minUppercase: 0,
            minLowercase: 0,
            minNumbers: 0
        })

        return this.checkResult(validPassword)
    }

    private validateNumber(number: Number) {
        if(number > 0) {
            const validInteger = validator.isInt(String(number))

            return this.checkResult(validInteger)
        }

        throw new Error("Invalid or imcomplete field")
        
    }

    private validateTimestamp(timestamp: Date) {
        const validTimestamp = validator.isISO8601(String(timestamp))

        return this.checkResult(validTimestamp)
    }

    private checkResult(result: any) {
        
        if(result) {
            return result
        }

        throw new Error("Invalid or imcomplete field")
    }
}