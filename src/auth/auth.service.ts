import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
}
