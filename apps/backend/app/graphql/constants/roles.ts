import "reflect-metadata";
import { registerEnumType } from "type-graphql";

export enum Roles {
  SELLER = "seller",
  BUYER = "buyer",
}

registerEnumType(Roles, {
  name: "ROLES",
});
