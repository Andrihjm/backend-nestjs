import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserTypes, LoginUserTypes } from 'src/types/user.types';
import { UsersService } from 'src/users/users.service';
import { validatePassword } from 'src/utils/hash-password.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, username, password }: CreateUserTypes) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    return this.usersService.create({
      email,
      username,
      password,
    });
  }

  async login({ email, password }: LoginUserTypes) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email not found');
    }

    const isPasswordValid = await validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
