import type { NonEmptyArray } from "type-graphql";
import { OrganizationMutationResolver } from "./mutation";
import { OrganizationQueryResolver } from "./query";
import { OrganizationFieldResolver } from "./field";

export const OrganizationResolvers = [
  OrganizationMutationResolver,
  OrganizationQueryResolver,
  OrganizationFieldResolver,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
