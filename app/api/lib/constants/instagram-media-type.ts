import { registerEnumType } from "type-graphql";

export enum InstagramMediaType {
  Image = "IMAGE",
  Video = "VIDEO",
}

registerEnumType(InstagramMediaType, {
  name: "InstagramMediaType",
});
