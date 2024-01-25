import * as DataLoader from "DataLoader";
import { Tweet } from "src/tweet/entities/tweet.entity";
// avoiding circular dependancy
type BatchTweet = (ids: number[]) => Promise<Tweet[]>;

const batchTweets: BatchTweet = async (ids) => {
  const tweets = await Tweet.findAll({ where: { userId: ids } });
  //keys are tweet IDs
  const tweetMap: { [key: number]: Tweet } = {};
  tweets.forEach((tweet) => {
    tweetMap[tweet.id] = tweet;
  });

  return ids.map((id) => tweetMap[id]);
};
export const TweetLoader = () => new DataLoader<number, Tweet>(batchTweets);
