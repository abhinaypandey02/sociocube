import type { NonEmptyArray } from "type-graphql";
import { UserQueryResolver } from "./queries";
import { UserMutationResolver } from "./mutations";

export const UserResolvers = [
  UserQueryResolver,
  UserMutationResolver,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
