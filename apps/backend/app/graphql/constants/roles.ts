import "reflect-metadata";
import { registerEnumType } from "type-graphql";

export enum Roles {
  ADMIN = "admin",
  ReferralCreator = "referral_creator",
  ManuallyVerified = "manually_verified",
}

registerEnumType(Roles, {
  name: "ROLES",
});
