import type { NonEmptyArray } from "type-graphql";

import { RequestMutationResolver } from "./mutation";
import { RequestQueryResolver } from "./query";

export const RequestResolvers = [RequestMutationResolver, RequestQueryResolver];
