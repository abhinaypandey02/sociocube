import type { NonEmptyArray } from "type-graphql";
import { InviteMutationResolver } from "./mutation";
import { InviteQueryResolver } from "./query";

export const InviteResolvers = [
  InviteMutationResolver,
  InviteQueryResolver,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
