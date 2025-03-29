import type { NonEmptyArray } from "type-graphql";
import { ReviewFieldResolvers } from "./field";
import { ReviewMutationResolver } from "./mutation";
import { ReviewQueryResolver } from "./query";

export const ReviewResolvers = [
  ReviewFieldResolvers,
  ReviewMutationResolver,
  ReviewQueryResolver,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
