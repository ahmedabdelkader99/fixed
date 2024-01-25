import {
  Resolver,
  Query,
  Args,
  Parent,
  Context,
  ResolveField,
} from "@nestjs/graphql";
import { User, UserProfile } from "./entities/user.entity";
import { UserService } from "./user.service";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guards";
import { CurrentUser } from "src/user/decorator/current-user.decorator";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { Tweet } from "src/tweet/entities/tweet.entity";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  findUserProfile(@CurrentUser() user) {
    return this.userService.getUserprofile(user);
  }

  // @ResolveField("tweets", () => [Tweet])
  // getTweets(
  //   @Parent() user: User,
  //   @Context() { loaders }: { loaders: IDataloaders }
  // ) {
  //   const { id: userId } = user;
  //   return loaders.tweetsLoader.load(parseInt(userId));
  // }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  findAllUsers(
    @CurrentUser() user,
    @Args("page") page: number,
    @Args("limit") limit: number
  ) {
    return this.userService.findAllUsers(page, limit);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  findUserTweets(@CurrentUser() user) {
    return this.userService.findUserTweets(user);
  }
}
