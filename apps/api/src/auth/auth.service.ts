import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto, RegisterDto } from '@my-app/types';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(input: RegisterDto) {
    const existing = await this.usersService.findByEmail(input.email);
    if (existing) {
      throw new UnauthorizedException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await this.usersService.create({
      name: input.name,
      email: input.email,
      passwordHash
    });

    if (!user) {
      throw new UnauthorizedException('Unable to create user');
    }

    return this.createAuthResult(user.id, user.email, user);
  }

  async login(input: LoginDto) {
    const user = await this.validateUser(input.email, input.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.createAuthResult(user.id, user.email, user);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return null;
    }

    return user;
  }

  private createAuthResult(userId: string, email: string, user: { passwordHash: string } & Record<string, unknown>) {
    const token = this.jwtService.sign({ sub: userId, email });
    const { passwordHash: _passwordHash, ...safeUser } = user;
    return { token, user: safeUser };
  }
}
