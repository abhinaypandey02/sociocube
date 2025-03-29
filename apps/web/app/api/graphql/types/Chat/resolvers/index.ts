import type { NonEmptyArray } from "type-graphql";
import { ChatQueryResolvers } from "./query";
import { ChatMutationResolvers } from "./mutation";
import { ChatFieldResolvers } from "./field";

export const ChatResolvers = [
  ChatQueryResolvers,
  ChatMutationResolvers,
  ChatFieldResolvers,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
