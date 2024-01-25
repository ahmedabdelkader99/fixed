import { Sequelize } from "sequelize-typescript";

import { User } from "src/user/entities/user.entity";
import { Tweet } from "src/tweet/entities/tweet.entity";
import { UserFollowingEntity } from "src/follow/entities/follow.entity";
import { React } from "src/likeReact/react.entity";
import {
  DEVELOPMENT,
  PRODUCTION,
  SEQUELIZE,
  TEST,
} from "src/constant/constants";
const databaseConfig = require("../database/database.config");

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Tweet, UserFollowingEntity, React]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
