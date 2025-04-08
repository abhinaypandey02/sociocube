import type { NonEmptyArray } from "type-graphql";

import { ReviewFieldResolvers } from "./field";
import { ReviewMutationResolver } from "./mutation";
import { ReviewQueryResolver } from "./query";

export const ReviewResolvers = [
  ReviewFieldResolvers,
  ReviewMutationResolver,
  ReviewQueryResolver,
] as NonEmptyArray<Function>;
