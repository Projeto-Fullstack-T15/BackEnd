import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';

function isValidCPF(cpf: string): boolean {
    let sum, rest;
    if (cpf === undefined || cpf.trim().length === 0 || cpf === "00000000000") return false;

    cpf = cpf.replace(/[.-]/g, "");

    if (cpf.length !== 11) return false;

    for (let i = 1; i <= 9; i++) if (cpf.substring(0, i).repeat(11) === cpf) return false;

    sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);

    rest = 11 - (sum % 11);
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);

    rest = 11 - (sum % 11);
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.charAt(10))) return false;

    return true;
}

@ValidatorConstraint({ async: false })
export class IsCPFConstraint implements ValidatorConstraintInterface {
    validate(cpf: string): boolean {
        return isValidCPF(cpf);
    }

    defaultMessage(): string {
        return "The $property must be a valid CPF";
    }
}

export function IsCPF(validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCPFConstraint
        });
    };
}