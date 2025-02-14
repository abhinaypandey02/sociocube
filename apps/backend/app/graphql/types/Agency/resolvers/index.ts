import type { NonEmptyArray } from "type-graphql";
import { AgencyQueryResolvers } from "./query";
import { AgencyOnboardingFieldResolver } from "./field/onboarding";
import { AgencyFieldResolver } from "./field/agency";
import { AgencyMemberFieldResolver } from "./field/agency-member";
import { AgencyMutationResolvers } from "./mutation";

export const AgencyResolvers = [
  AgencyMutationResolvers,
  AgencyOnboardingFieldResolver,
  AgencyQueryResolvers,
  AgencyFieldResolver,
  AgencyMemberFieldResolver,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
