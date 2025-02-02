import type { NonEmptyArray } from "type-graphql";
import { RequestMutationResolver } from "./mutation";

export const RequestResolvers = [
  RequestMutationResolver,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
