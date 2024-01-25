import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UserCreateDto } from "./dto/create-user.inputs";
import { UserLoginDto } from "./dto/login-user.inputs";
import { UserToken } from "./user-token";
import { UsePipes, ValidationPipe } from "@nestjs/common";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => UserToken)
  @UsePipes(new ValidationPipe())
  register(@Args("user") user: UserCreateDto) {
    return this.authService.register(user);
  }

  @Mutation(() => UserToken)
  @UsePipes(new ValidationPipe())
  login(@Args("user") user: UserLoginDto) {
    return this.authService.login(user);
  }
}
