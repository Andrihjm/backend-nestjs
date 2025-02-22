import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserTypes, LoginUserTypes } from 'src/types/user.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: CreateUserTypes) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginUserTypes) {
    return this.authService.login(body);
  }
}
