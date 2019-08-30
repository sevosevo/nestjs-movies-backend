import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from './db.constants';

export const databaseProvider = {
  provide: DATABASE_CONNECTION,
  useFactory: async () =>
    await createConnection({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'sevo1389',
      database: 'test',
      synchronize: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    }),
};
