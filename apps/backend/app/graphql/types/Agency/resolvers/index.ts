import type { NonEmptyArray } from "type-graphql";
import { AgencyMutationResolvers } from "./mutation";
import { AgencyOnboardingFieldResolver } from "./field/onboarding";

export const AgencyResolvers = [
  AgencyMutationResolvers,
  AgencyOnboardingFieldResolver,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
