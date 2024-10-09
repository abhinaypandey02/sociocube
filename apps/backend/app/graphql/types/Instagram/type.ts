import { Field, Int, ObjectType, registerEnumType } from "type-graphql";

@ObjectType("InstagramStats")
export class InstagramStats {
  @Field(() => Int)
  followers: number;
  @Field()
  username: string;
  @Field(() => Int)
  mediaCount: number;
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
  caption: string;
}

export enum InstagramMediaType {
  REEL = "REEL",
  FEED = "FEED",
}

registerEnumType(InstagramMediaType, {
  name: "InstagramMediaType",
});
