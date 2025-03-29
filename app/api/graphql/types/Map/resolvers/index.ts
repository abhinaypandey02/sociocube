import type { NonEmptyArray } from "type-graphql";
import { MapQueryResolvers } from "./query";

export const MapResolvers = [
  MapQueryResolvers,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
