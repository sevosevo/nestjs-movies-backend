import { Controller, Get, Param, ParseIntPipe, Inject, UseInterceptors } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { User } from './users.entity';
import { USER_REPOSITORY } from './users.constants';
import { makeCacheInterceptor } from '../interceptors/cache.interceptor'

@Controller('api/users')
export class UsersController {
  constructor(
    @Inject(USER_REPOSITORY) private readonly usersRepository: UserRepository,
  ) {}

  /**
   * Get all users
   */
  @UseInterceptors(makeCacheInterceptor({ttl: 240, getKey: (request) => request.url}))
  @Get()
  getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /**
   * Find user by id
   * @param id
   */
  @UseInterceptors(makeCacheInterceptor({ttl: 240, getKey: (request) => request.url}))
  @Get(':id')
  getUserById(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.usersRepository.findOne({ id });
  }
}

