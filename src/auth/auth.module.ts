import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
//Importing jwt module provided by nestjs
import { JwtModule } from '@nestjs/jwt';
//Import strategies
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
//Importing controller
import { AuthController } from './auth.controller';
//Importing passport module provided by nestjs
import { PassportModule } from '@nestjs/passport';
import { HashModule } from '../hash/hash.module';

@Module({
  imports: [
    HashModule.register({ saltRounds: 16 }),
    JwtModule.register({
      secret: 'secretforuse',
      signOptions: { expiresIn: '6h' },
    }),
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwtLogin', session: false }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
