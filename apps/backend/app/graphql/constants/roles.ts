import "reflect-metadata";
import { registerEnumType } from "type-graphql";

export enum Roles {
  SELLER = "seller",
}

registerEnumType(Roles, {
  name: "ROLES",
});
