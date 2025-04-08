import type { NonEmptyArray } from "type-graphql";

import { PortfolioFieldResolvers } from "./field";
import { PortfolioMutationResolver } from "./mutation";
import { PortfolioQueryResolver } from "./query";

export const PortfolioResolvers = [
  PortfolioQueryResolver,
  PortfolioMutationResolver,
  PortfolioFieldResolvers,
];
