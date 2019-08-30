import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'jwtLogin') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
  
    const { id } = (await this.authService.validateUser({
      email,
      password,
    })) || { id: null };

    if (!id) {
      throw new ForbiddenException('Wrong credentials.');
    }

    return id;
  }
}
