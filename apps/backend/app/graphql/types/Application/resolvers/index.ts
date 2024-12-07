import type { NonEmptyArray } from "type-graphql";
import { ApplicationFieldResolvers } from "./field";

export const ApplicationResolvers = [
  ApplicationFieldResolvers,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
