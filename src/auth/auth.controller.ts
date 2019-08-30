import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from './dto/users.dto';


@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Authenticates user providing him jwt token. Powered by passport.
   * @param req
   */
  @Post('login')
  @UseGuards(AuthGuard('jwtLogin'))
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * Registers user.
   * @param userDto
   */
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() userDto: UserDto) {
    return await this.authService.register(userDto);
  }

  /**
   * Provides jwt authentication flow
   * @param req
   */
  @Get('private')
  @UseGuards(AuthGuard('jwtAuth'))
  private(@Request() req) {
    console.log(req.user);
    return 'Access Granted...';
  }
}
