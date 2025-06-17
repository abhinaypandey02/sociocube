import "reflect-metadata";

import { registerEnumType } from "type-graphql";

export enum PostingPlatforms {
  INSTAGRAM = "instagram",
  YOUTUBE = "youtube",
  TIKTOK = "tiktok",
  LINKEDIN = "linkedin",
  FACEBOOK = "facebook",
  X = "x",
}

registerEnumType(PostingPlatforms, {
  name: "PostingPlatforms",
});
