import validator from "validator";

interface RegisterBookProps {
    name: string
    description: string;
    publish_date: Date
    amount: number
}

export class RegisterBookValidation {

    static validate(input: RegisterBookProps) {
        const validateInput = new RegisterBookValidation();

        validateInput.validateName(input.name)
    }

    private validateName(name: string) {
        const validName = validator.isEmpty(name)

        return this.checkResult(!validName)
    }

    private validateDescription(description: string) {
        const validDescription = validator
    }

    private checkResult(result: any) {
        if(result) {
            return result
        }

        throw new Error("Invalid or imcomplete field")
    }
}