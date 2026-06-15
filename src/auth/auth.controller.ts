import { Controller, Get, Post, Body, HttpCode, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private setCookie(res: Response, token: string) {
    res.cookie('auth_token', token, COOKIE_OPTIONS);
  }

  @Post('register')
  @HttpCode(201)
  async register(
    @Body() body: { name: string; email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(body);
    this.setCookie(res, result.token);
    return {
      token: result.token,
      user: {
        id: String(result.user.id),
        name: result.user.name,
        email: result.user.email,
        phone: result.user.phone ?? null,
        avatar_url: result.user.avatarUrl ?? null,
      },
    };
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(body);
    this.setCookie(res, result.token);
    return {
      token: result.token,
      user: {
        id: String(result.user.id),
        name: result.user.name,
        email: result.user.email,
        phone: result.user.phone ?? null,
        avatar_url: result.user.avatarUrl ?? null,
      },
    };
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth_token', { path: '/' });
    return { message: 'Logged out' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: User) {
    return {
      id: String(user.id),
      name: user.name,
      email: user.email,
      phone: user.phone ?? null,
      avatar_url: user.avatarUrl ?? null,
    };
  }
}
