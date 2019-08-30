import { Module } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HASH_OPTIONS, BCRYPT } from './hash.constants';
import { Options } from './hash.interfaces';
import { HashService } from './hash.service';

@Module({
  providers: [
    {
      provide: BCRYPT,
      useValue: bcrypt,
    },
  ],
})
export class HashModule {
  static register(options: Options) {
    return {
      module: HashModule,
      providers: [
        {
          provide: HASH_OPTIONS,
          useValue: options,
        },
        HashService,
      ],
      exports: [HashService],
    };
  }
}
