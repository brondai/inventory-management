import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginSchema, RegisterSchema } from '@my-app/types';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) {}

  @Post('register')
  async register(@Body() body: unknown, @Res({ passthrough: true }) response: Response) {
    const input = RegisterSchema.parse(body);
    const result = await this.authService.register(input);
    this.setAuthCookie(response, result.token);
    return { user: result.user };
  }

  @Post('login')
  async login(@Body() body: unknown, @Res({ passthrough: true }) response: Response) {
    const input = LoginSchema.parse(body);
    const result = await this.authService.login(input);
    this.setAuthCookie(response, result.token);
    return { user: result.user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() request: { user?: { userId: string } }) {
    const userId = request.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('Not authenticated');
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Not authenticated');
    }

    const { passwordHash: _passwordHash, ...safeUser } = user;
    return { user: safeUser };
  }

  private setAuthCookie(response: Response, token: string) {
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN') ?? '7d';
    const maxAge = this.parseDurationToMs(expiresIn);

    response.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge
    });
  }

  private parseDurationToMs(value: string): number {
    if (value.endsWith('d')) {
      return Number(value.replace('d', '')) * 24 * 60 * 60 * 1000;
    }
    if (value.endsWith('h')) {
      return Number(value.replace('h', '')) * 60 * 60 * 1000;
    }
    return 7 * 24 * 60 * 60 * 1000;
  }
}
