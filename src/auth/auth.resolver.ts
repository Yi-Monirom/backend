import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayload } from './entities/auth-payload.entity';
import { LoginInput } from './dto/login.input';
import { CreateUserInput } from '../user/dto/create-user.input';
import { User } from '../user/entities/user.entity';
import { GqlAuthGuard } from './guards/gql-auth.guard';

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

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  me(@Context() context: any) {
    return context.req.user;
  }
}
