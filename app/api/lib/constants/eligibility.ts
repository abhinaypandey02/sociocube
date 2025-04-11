import "reflect-metadata";

import { registerEnumType } from "type-graphql";

export enum Eligibility {
  Closed = "CLOSED",
  Unauthorized = "UNAUTHORIZED",
  NotOnboarded = "NOT_ONBOARDED",
  LessFollowers = "LESS_FOLLOWERS",
  NotAgeGroup = "NOT_AGE_GROUP",
  Eligible = "ELIGIBLE",
}

registerEnumType(Eligibility, {
  name: "Eligibility",
});
