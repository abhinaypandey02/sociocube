import type { AuthorizedContext } from "@backend/lib/auth/context";
import { Ctx, Query, Resolver } from "type-graphql";

import { FileGQL } from "../File/type";
import { getPortfolioUploadURL } from "./resolvers/portfolio-upload-url";

@Resolver()
export class PortfolioQueryResolver {
  @Query(() => FileGQL, { nullable: true })
  getPortfolioUploadURL(
    @Ctx() ctx: AuthorizedContext,
  ): Promise<FileGQL | null> {
    return getPortfolioUploadURL(ctx);
  }
}
