import type { NonEmptyArray } from "type-graphql";
import { PostingFieldResolvers } from "./field";
import { PostingQueryResolvers } from "./query";
import { PostingMutationResolvers } from "./mutation";

export const PostingResolvers = [
  PostingFieldResolvers,
  PostingQueryResolvers,
  PostingMutationResolvers,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
