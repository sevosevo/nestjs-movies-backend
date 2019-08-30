import {
  Injectable,
  Inject,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { USER_REPOSITORY } from '../users/users.constants';
import { UserRepository } from '../users/users.repository';
import { UserDto } from './dto/users.dto';
import { User } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from './jwt.token';
import { HashService } from '../hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  /**
   * Responsible for validating user.
   * @param user
   */
  async validateUser(user: UserDto): Promise<User | null> {
    const { email, password } = user;

    const f = await this.usersRepository.findOne({ email }, {select: ['id', 'password']});

    if (!f) return null;

    const p = await this.hashService.compare(password, f.password);

    if (!p) return null;

    return f;
  }
  /**
   * Signs token after valid authentication handled by passport.
   * @param id
   */
  async login(id: any): Promise<{ token: JwtToken }> {
    const token = await this.jwtService.signAsync({ id });
    return { token };
  }

  /**
   * Responsible for hashing password. Deleting password from response and serving it to controller.
   * @param userDto
   */
  async register(userDto: UserDto): Promise<User> {
    userDto.password = await this.hashService.hash(userDto.password);
    let user: User;
    try {
      user = await this.usersRepository.register(userDto);
    } catch (error) {
      if ((error.code = 'ER_DUP_ENTRY')) {
        throw new ConflictException('This user already exists.');
      } else {
        throw new InternalServerErrorException('Server error occured...');
      }
    }
    delete user.password;
    return user;
  }
}
