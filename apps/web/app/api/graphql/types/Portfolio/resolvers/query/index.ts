import { Ctx, Query, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import { FileGQL } from "../../../File/type";
import { getPortfolioUploadURL } from "./portfolio-upload-url";

@Resolver()
export class PortfolioQueryResolver {
  @Query(() => FileGQL, { nullable: true })
  getPortfolioUploadURL(
    @Ctx() ctx: AuthorizedContext,
  ): Promise<FileGQL | null> {
    return getPortfolioUploadURL(ctx);
  }
}
