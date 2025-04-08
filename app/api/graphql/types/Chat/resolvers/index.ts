import type { NonEmptyArray } from "type-graphql";

import { ChatFieldResolvers } from "./field";
import { ChatMutationResolvers } from "./mutation";
import { ChatQueryResolvers } from "./query";

export const ChatResolvers = [
  ChatQueryResolvers,
  ChatMutationResolvers,
  ChatFieldResolvers,
] as NonEmptyArray<Function>;
