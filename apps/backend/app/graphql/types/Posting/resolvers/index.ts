import type { NonEmptyArray } from "type-graphql";
import { ApplicationFieldResolver } from "./field/application";
import { PostingFieldResolver } from "./field/posting";

export const PostingResolvers = [
  ApplicationFieldResolver,
  PostingFieldResolver,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
