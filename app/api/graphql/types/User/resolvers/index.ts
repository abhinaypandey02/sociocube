import type { NonEmptyArray } from "type-graphql";

import { UserFieldResolver } from "./field";
import { UserMutationResolver } from "./mutations";
import { UserQueryResolver } from "./queries";

export const UserResolvers = [
  UserQueryResolver,
  UserMutationResolver,
  UserFieldResolver,
] as NonEmptyArray<Function>;
