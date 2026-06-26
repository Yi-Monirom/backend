import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../user/user.service';
import { LoginInput } from './dto/login.input';
import { CreateUserInput } from '../user/dto/create-user.input';
import { AuthPayload } from './entities/auth-payload.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput): Promise<AuthPayload> {
    const user = await this.userService.findByEmail(loginInput.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const valid = await bcrypt.compare(loginInput.password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { token, user };
  }

  async register(createUserInput: CreateUserInput): Promise<AuthPayload> {
    const user = await this.userService.create(createUserInput);
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { token, user };
  }

  async forgotPassword(email: string): Promise<string> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User with this email not found');
    }
    const resetToken = uuidv4();
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000);
    await this.userService.update(user.id, {
      id: user.id,
      resetToken: user.resetToken,
      resetTokenExpiry: user.resetTokenExpiry,
    });
    return resetToken;
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const user = await this.userService.findByResetToken(token);
    if (!user || !user.resetTokenExpiry) {
      throw new NotFoundException('Invalid reset token');
    }
    if (new Date() > user.resetTokenExpiry) {
      throw new BadRequestException('Reset token has expired');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userService.update(user.id, {
      id: user.id,
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });
    return true;
  }
}
