import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from './users.constants';
import { UserRepository } from './users.repository';
import { User } from './users.entity';
import { HashService } from '../hash/hash.service';
import { UserDto } from '../auth/dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  findById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }
}
