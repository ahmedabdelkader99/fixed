import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { GraphQLModule } from "@nestjs/graphql";
import { TweetModule } from "./tweet/tweet.module";
import { AuthModule } from "./auth/auth.module";
import { FollowModule } from "./follow/follow.module";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { TweetLoader } from "./dataloader/dataloader.tweet";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      context: ({ req, res }) => ({
        req,
        res,
        tweetLoader: TweetLoader(),
      }),
    }),
    DatabaseModule,
    AuthModule,
    FollowModule,
    UserModule,
    TweetModule,
  ],
})
export class AppModule {}

// GraphQLModule.forRootAsync<ApolloDriverConfig>({
//   driver: ApolloDriver,
//   imports: [DataloaderModule],
//   sortSchema: true,

//   context: ({req, res}) =>({
//     req,
//     res,
//     tweetLoader: TweetLoader(),
//   })
//   // useFactory: (dataloaderService: DataloaderService) => {
//   //   return {
//   //     autoSchemaFile: true,
//   //     context: () => ({
//   //       loaders: dataloaderService.getLoaders(),
//   //     }),
//   //   };
//   // },
//   //inject: [DataloaderService],
// }),
