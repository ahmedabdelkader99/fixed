import { ObjectType, Field, Int } from "@nestjs/graphql";
import {
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from "sequelize-typescript";
import { Tweet } from "src/tweet/entities/tweet.entity";
import { User } from "src/user/entities/user.entity";

@Table
@ObjectType()
export class React extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  @Field((type) => Int)
  id: number;

  @ForeignKey(() => User)
  @Field((type) => Int)
  userId: number; 
  @ForeignKey(() => Tweet)
  @Field((type) => Int)
  tweetId: number;
}
