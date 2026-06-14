import { Controller, Get, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() body: { name: string; email: string; password: string }) {
    const result = await this.authService.register(body);
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
  async login(@Body() body: { email: string; password: string }) {
    const result = await this.authService.login(body);
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
