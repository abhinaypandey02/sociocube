import { Field, Int, ObjectType } from "type-graphql";
import { InstagramMediaType } from "../../constants/instagram-media-type";

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
}

@ObjectType("InstagramMedia")
export class InstagramMedia {
  @Field()
  thumbnail: string;
  @Field(() => Int)
  likes: number;
  @Field(() => Int)
  comments: number;
  @Field(() => InstagramMediaType)
  type: InstagramMediaType;
  @Field()
  link: string;
  @Field()
  er: number;
  @Field(() => String, { nullable: true })
  caption: string | null;
}
