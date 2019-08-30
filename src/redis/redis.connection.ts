import * as redis from 'redis';

export let client;

client = redis.createClient();
