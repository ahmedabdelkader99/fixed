import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Default,
  HasMany,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
  Unique,
  Validate,
} from "sequelize-typescript";
import { Tweet } from "src/tweet/entities/tweet.entity";
import { React } from "src/likeReact/react.entity";
import { UserFollowingEntity } from "src/follow/entities/follow.entity";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class UserProfile {
  @Field(() => ID)
  id: number;

  @Field()
  displayName: string;

  @Field({ nullable: true })
  bio?: string;

  // Add any other profile-related fields as needed
}
@ObjectType()
@Table
export class User extends Model {
  @Field()
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;
  @Field()
  @Column
  name: string;
  @Validate({ isEmail: true })
  @Unique
  @Column(DataType.STRING)
  @Field()
  email: string;
  @Field()
  @Column
  password: string;

  @HasMany(() => React, "userId")
  @Field((type) => [React], { nullable: "items" })
  react: React[];

  @HasMany(() => Tweet)
  @Field(() => [Tweet], { nullable: true })
  tweets: Tweet[];

  @BelongsToMany(
    () => User,
    () => UserFollowingEntity,
    "followeeId",
    "followerId"
  )
  @Field(() => [User], { nullable: true })
  followers: User[];

  @BelongsToMany(
    () => User,
    () => UserFollowingEntity,
    "followerId",
    "followeeId"
  )
  @Field(() => [User], { nullable: true })
  follwing: User[];
}
