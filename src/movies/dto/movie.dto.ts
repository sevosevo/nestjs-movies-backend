import { MinLength, MaxLength, IsNotEmpty, IsIn, ArrayContains, Validate } from 'class-validator';
import { CustomArrayOneOfGenres } from '../../validators/arrayoneof.validator';
const MUST_BE_FILLED_IN = `$property must be a filled in`;
export class MovieDto {
  @IsNotEmpty({ message: MUST_BE_FILLED_IN })
  name: string;
  @IsNotEmpty({ message: MUST_BE_FILLED_IN })
  @MinLength(25, { message: '$property must be at leastt 25 chars long.' })
  @MaxLength(1000, { message: '$property must be less then 1000 chars long.' })
  description: string;
  @IsNotEmpty()
  @Validate(CustomArrayOneOfGenres, [1, 2, 3, 4, 5])
  genres: number[]
}
