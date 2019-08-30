import { IsEmail, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
const MUST_BE_FILLED_IN = `$property must be a filled in`;
export class UserDto {
  @IsNotEmpty({ message: MUST_BE_FILLED_IN })
  @IsEmail()
  email: string;
  @IsNotEmpty({ message: MUST_BE_FILLED_IN })
  @MinLength(8, { message: '$property must be at leastt 8 chars long.' })
  @MaxLength(38, { message: '$property must be less then 38 chars long.' })
  password: string;
}
