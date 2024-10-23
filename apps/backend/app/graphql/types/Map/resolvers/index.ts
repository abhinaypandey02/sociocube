import type { NonEmptyArray } from "type-graphql";
import { MapQueryResolver } from "./queries";

export const MapResolvers = [
  MapQueryResolver,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
