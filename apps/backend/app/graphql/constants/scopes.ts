import "reflect-metadata";
import { registerEnumType } from "type-graphql";

export enum AuthScopes {
  INSTAGRAM = "instagram",
  GOOGLE = "google",
  EMAIL = "email",
  PHONE = "phone",
}

registerEnumType(AuthScopes, {
  name: "AuthScopes",
});
