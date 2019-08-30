import { EntityRepository, Repository } from 'typeorm';
import { User } from './users.entity';
import { UserDto } from '../auth/dto/users.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(userDto: UserDto) {
    const { email, password } = userDto;
    const user = new User();
    user.email = email;
    user.password = password;
    return user.save();
  }
}
