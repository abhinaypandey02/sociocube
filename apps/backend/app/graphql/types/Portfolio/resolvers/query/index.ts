import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { PortfolioGQL } from "../../type";
import type { AuthorizedContext } from "../../../../context";
import { FileGQL } from "../../../File/type";
import { getUserPortfolio } from "./get-user-portfolio";
import { getPortfolioUploadURL } from "./portfolio-upload-url";

@Resolver()
export class PortfolioQueryResolver {
  @Authorized()
  @Query(() => [PortfolioGQL])
  getUserPortfolio(@Ctx() ctx: AuthorizedContext) {
    return getUserPortfolio(ctx);
  }
  @Query(() => FileGQL, { nullable: true })
  getPortfolioUploadURL(
    @Ctx() ctx: AuthorizedContext,
  ): Promise<FileGQL | null> {
    return getPortfolioUploadURL(ctx);
  }
}
