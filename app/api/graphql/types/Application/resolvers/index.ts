import type { NonEmptyArray } from "type-graphql";

import { ApplicationFieldResolvers } from "./field";
import { ApplicationMutationResolver } from "./mutation";
import { ApplicationQueryResolver } from "./query";

export const ApplicationResolvers = [
  ApplicationFieldResolvers,
  ApplicationMutationResolver,
  ApplicationQueryResolver,
];
