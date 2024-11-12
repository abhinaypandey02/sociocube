import "reflect-metadata";
import { registerEnumType } from "type-graphql";

export enum Roles {
  SELLER = "seller",
  ADMIN = "admin",
}

registerEnumType(Roles, {
  name: "ROLES",
});
