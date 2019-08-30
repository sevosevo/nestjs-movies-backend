import { Module } from "@nestjs/common";
import { REDIS } from './redis.constants';
import { client } from './redis.connection';

const redisProvider = {
    provide: REDIS,
    useValue: client
}

@Module({
    providers: [redisProvider],
    exports: [redisProvider]
})
export class RedisModule { }