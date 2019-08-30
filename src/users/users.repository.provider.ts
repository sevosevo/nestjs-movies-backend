import { Connection } from 'typeorm';
import { DATABASE_CONNECTION } from '../db/db.constants';
import { USER_REPOSITORY } from './users.constants';
import { UserRepository } from './users.repository';

export const UserRepositoryProvider = {
  provide: USER_REPOSITORY,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(UserRepository),
  inject: [DATABASE_CONNECTION],
};
