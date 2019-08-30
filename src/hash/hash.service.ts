import { Injectable, Inject } from '@nestjs/common';
import { HASH_OPTIONS, BCRYPT } from './hash.constants';
import { Options } from './hash.interfaces';

@Injectable()
export class HashService {
  constructor(
    @Inject(BCRYPT) private readonly bcrypt: any,
    @Inject(HASH_OPTIONS) private readonly options: Options,
  ) {}
  /**
   * Responsible for hashing password
   * @param password
   * @returns Promise<string>
   */
  async hash(password: string): Promise<string> {
    const salt = await this.bcrypt.genSalt(this.options.saltRounds);
    const hash = await this.bcrypt.hash(password, salt);
    return hash;
  }
  /**
   * Responsible for comparing plainPassword with hashedPassword
   * @param plainPassword
   * @param hashedPassword
   * @returns Promise<boolean>
   */
  async compare(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await this.bcrypt.compare(plainPassword, hashedPassword);
  }
}
