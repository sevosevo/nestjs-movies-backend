import { Connection } from 'typeorm';
import { DATABASE_CONNECTION } from '../db/db.constants';
import { MOVIES_REPOSITORY } from './movies.constants';
import { MovieRepository } from './movies.repository';

export const MoviesRepositoryProvider = {
  provide: MOVIES_REPOSITORY,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(MovieRepository),
  inject: [DATABASE_CONNECTION],
};
