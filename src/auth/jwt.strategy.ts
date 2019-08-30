import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwtAuth') {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretforuse',
      ignoreExpiration: false,
    });
  }
  async validate(payload: { id: number }) {
    const u = await this.usersService.findById(payload.id);
    if (!u) {
      throw new ForbiddenException(
        "Token is valid but user doesn't exist anymore.",
      );
    }
    return u;
  }
}
