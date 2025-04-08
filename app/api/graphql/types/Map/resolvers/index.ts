import type { NonEmptyArray } from "type-graphql";

import { MapQueryResolvers } from "./query";

export const MapResolvers = [MapQueryResolvers] as NonEmptyArray<Function>;
