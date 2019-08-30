import { RedisClient } from 'redis';
declare module 'redis' {
    export interface RedisClient {
        setAsync(key: string, value: string, ex?: 'EX', ttl?: number): Promise<void>
        getAsync(key: string): Promise<string>
    }
}