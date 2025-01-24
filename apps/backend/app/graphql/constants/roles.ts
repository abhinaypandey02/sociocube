import "reflect-metadata";
import { registerEnumType } from "type-graphql";

export enum Roles {
  SELLER = "seller",
  ADMIN = "admin",
  ReferralCreator = "referral_creator",
}

registerEnumType(Roles, {
  name: "ROLES",
});
