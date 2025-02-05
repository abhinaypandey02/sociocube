import type { NonEmptyArray } from "type-graphql";
import { PortfolioMutationResolver } from "./mutation";
import { PortfolioQueryResolver } from "./query";

export const PortfolioResolvers = [
  PortfolioQueryResolver,
  PortfolioMutationResolver,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
