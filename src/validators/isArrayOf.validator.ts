import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';

@ValidatorConstraint({ name: 'array_is_of_numers', async: false })
export class IsArrayOf implements ValidatorConstraintInterface {
    validate(value: Array<number>, args: ValidationArguments){
        if(Array.isArray(value)){
            return value.every(val => !isNaN(val))
        }
        return false;
    }

    defaultMessage() {
        return `Genre ids field not valid.`;
    }
}