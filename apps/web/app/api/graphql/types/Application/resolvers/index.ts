import type { NonEmptyArray } from "type-graphql";
import { ApplicationFieldResolvers } from "./field";
import { ApplicationMutationResolver } from "./mutation";
import { ApplicationQueryResolver } from "./query";

export const ApplicationResolvers = [
  ApplicationFieldResolvers,
  ApplicationMutationResolver,
  ApplicationQueryResolver,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
