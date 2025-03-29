import { registerEnumType } from "type-graphql";

export enum InstagramMediaType {
  CarouselAlbum = "CAROUSEL_ALBUM",
  Image = "IMAGE",
  Video = "VIDEO",
}

registerEnumType(InstagramMediaType, {
  name: "InstagramMediaType",
});
