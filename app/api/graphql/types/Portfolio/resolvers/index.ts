import type { NonEmptyArray } from "type-graphql";
import { PortfolioMutationResolver } from "./mutation";
import { PortfolioQueryResolver } from "./query";
import { PortfolioFieldResolvers } from "./field";

export const PortfolioResolvers = [
  PortfolioQueryResolver,
  PortfolioMutationResolver,
  PortfolioFieldResolvers,
  // eslint-disable-next-line @typescript-eslint/ban-types -- We need to accept any type of functions here
] as NonEmptyArray<Function>;
