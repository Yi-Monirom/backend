import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthPayload } from './entities/auth-payload.entity';
import { LoginInput } from './dto/login.input';
import { CreateUserInput } from '../user/dto/create-user.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthPayload)
  register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.register(createUserInput);
  }
}
