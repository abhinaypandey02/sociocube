import type { NonEmptyArray } from "type-graphql";

import { PostingFieldResolvers } from "./field";
import { PostingMutationResolvers } from "./mutation";
import { PostingQueryResolvers } from "./query";

export const PostingResolvers = [
  PostingFieldResolvers,
  PostingQueryResolvers,
  PostingMutationResolvers,
] as NonEmptyArray<Function>;
