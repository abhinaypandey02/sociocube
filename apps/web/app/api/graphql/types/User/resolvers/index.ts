import type { NonEmptyArray } from "type-graphql";
import { UserQueryResolver } from "./queries";
import { UserMutationResolver } from "./mutations";
import { UserFieldResolver } from "./field";

export const UserResolvers = [
  UserQueryResolver,
  UserMutationResolver,
  UserFieldResolver,
] as NonEmptyArray<Function>;
