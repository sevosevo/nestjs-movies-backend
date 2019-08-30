import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepositoryProvider } from './users.repository.provider';
import { DbModule } from '../db/db.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule, DbModule],
  providers: [UserRepositoryProvider, UsersService],
  controllers: [UsersController],
  exports: [UserRepositoryProvider, UsersService],
})
export class UsersModule {}
