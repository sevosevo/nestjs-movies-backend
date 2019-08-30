import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { DbModule } from './db/db.module';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HashModule } from './hash/hash.module';

import {
  FrontendMiddleware,
  ServeStaticForReact,
} from './serveReact.middleware';

@Module({
  imports: [
    DbModule, 
    MoviesModule, 
    UsersModule, 
    AuthModule, 
    HashModule],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    //Serving SPA (React)
    consumer.apply(ServeStaticForReact).forRoutes({
      path: '/serve',
      method: RequestMethod.ALL,
    });
    consumer.apply(FrontendMiddleware).forRoutes({
      path: '/',
      method: RequestMethod.ALL,
    });
  }
}
