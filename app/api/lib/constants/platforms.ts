import "reflect-metadata";

import { registerEnumType } from "type-graphql";

export enum PostingPlatforms {
  INSTAGRAM = "instagram",
  YOUTUBE = "youtube",
}

registerEnumType(PostingPlatforms, {
  name: "PostingPlatforms",
});
