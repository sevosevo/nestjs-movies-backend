import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { MoviesService } from './movies.service';
import { MoviesRepositoryProvider } from './movies.repository.provider';
import { MoviesController } from './movies.controller';
import { RedisModule } from '../redis/redis.module';


@Module({
  imports: [DbModule, RedisModule],
  providers: [MoviesRepositoryProvider, MoviesService],
  controllers: [MoviesController],
  exports: [MoviesRepositoryProvider, MoviesService],
})
export class MoviesModule {}
