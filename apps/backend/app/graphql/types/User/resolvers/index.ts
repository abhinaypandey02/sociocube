import type { NonEmptyArray } from "type-graphql";
import { UserQueryResolver } from "./queries";
import { UserMutationResolver } from "./mutations";
import { UserFieldResolver } from "./field";

export const UserResolvers = [
  UserQueryResolver,
  UserMutationResolver,
  UserFieldResolver,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
