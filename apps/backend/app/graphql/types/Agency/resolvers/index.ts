import type { NonEmptyArray } from "type-graphql";
import { AgencyMutationResolvers } from "./mutation";
import { AgencyOnboardingFieldResolver } from "./field/onboarding";
import { AgencyFieldResolver } from "./field/agency";
import { AgencyMemberFieldResolver } from "./field/agency-member";

export const AgencyResolvers = [
  AgencyMutationResolvers,
  AgencyOnboardingFieldResolver,
  AgencyFieldResolver,
  AgencyMemberFieldResolver,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
