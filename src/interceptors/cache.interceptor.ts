////<reference path="../types/custom.d.ts" />
import {
  ExecutionContext,
  NestInterceptor,
  CallHandler,
  mixin,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Observable, forkJoin, from } from 'rxjs';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap, mergeMap } from 'rxjs/operators';
import { REDIS } from '../redis/redis.constants';
import { RedisClient } from 'redis';
import * as bluebird from 'bluebird';

interface options {ttl ?: number, getKey: (request: Request) => any};


@Injectable()
export abstract class CacheInterceptor implements NestInterceptor{
  protected abstract readonly options: options;

  //Inject redis instance/client
  constructor(@Inject(REDIS) private readonly redis: RedisClient) {
    bluebird.promisifyAll(redis);
  }

  async intercept(
    //Express context
    context: ExecutionContext,
    //Middleware handler -> observer rxjs
    handler: CallHandler
  ): Promise<Observable<any>> {

    //Switch to http
    const http = context.switchToHttp();
    //Get express request object
    const request = http.getRequest<Request>();
    //Get custom key used for caching
    const key = this.options.getKey(request);
    console.log(key);
    //Time 
    const ttl = this.options.ttl;
    //Putting cached var outside so it's not garbage collected
    let cached: any;

    try{ 

     cached = await this.redis.getAsync(key);

    }catch(err) {
      
      return of({
        error: err.message
      }); //Handle error with rxjs

    }
    
    //If we have cache we won't to return different response and not run middleware
    if( cached ) {
      console.log('returning cache');
      return of(JSON.parse(cached));
    }
    console.log('creating  cache');
    return handler.handle()
    .pipe(
      switchMap((response: any) => {
        return forkJoin(
          of(response),
          this.redis.setAsync(key, JSON.stringify(response), 'EX', ttl)
        ).pipe(catchError(e => of(response)));
      }),
      map(([res, setOp]) => res)
    );
}
}

export const makeCacheInterceptor = (options: options) => mixin(
  class extends CacheInterceptor {
    protected readonly options = options;
  }
)


