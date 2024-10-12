import type { NonEmptyArray } from "type-graphql";
import { ChatQueryResolver } from "./queries";
import { ChatMutationResolver } from "./mutations";
import { ChatFieldResolver } from "./field";

export const ChatResolvers = [
  ChatQueryResolver,
  ChatMutationResolver,
  ChatFieldResolver,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
