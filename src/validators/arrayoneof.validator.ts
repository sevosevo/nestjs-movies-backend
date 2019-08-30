import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";

@ValidatorConstraint({ name: 'genre_check', async: false })
export class CustomArrayOneOfGenres implements ValidatorConstraintInterface {

    validate(array: Array<number>, args: ValidationArguments) {
        if(Array.isArray(array)){
            const b = array.some(value =>  args.constraints.includes(value));
            if(  b  ) 
                return true;
            return false;
        }
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return `That genre doesn\'t exist (Valid are: ${args.constraints.join(', ')})`;
    }

}