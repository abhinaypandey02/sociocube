import { Field, Int, ObjectType } from "type-graphql";

@ObjectType("InstagramStats")
export class InstagramStats {
  @Field(() => Int)
  followers: number;
  @Field()
  username: string;
  @Field(() => Int)
  mediaCount: number;
  @Field(() => Int)
  averageLikes: number;
  @Field(() => Int)
  averageComments: number;
  @Field()
  er: number;
  @Field()
  isVerified: boolean;
}

@ObjectType("InstagramMedia")
export class InstagramMedia {
  @Field()
  timestamp: string;
  @Field()
  thumbnail: string;
  @Field(() => Int)
  likes: number;
  @Field(() => Int)
  comments: number;
  @Field()
  link: string;
  @Field(() => Number, { nullable: true })
  er?: number | null;
  @Field(() => String, { nullable: true })
  caption: string | null;
}
