import { FieldResolver, Resolver, Root } from "type-graphql";
import { AgencyGQL } from "../../type";
import {
  getInstagramMedia,
  getInstagramStats,
} from "../../../User/resolvers/field/instagram";
import type { AgencyDB } from "../../db/schema";
import { InstagramMedia, InstagramStats } from "../../../Instagram/type";

@Resolver(() => AgencyGQL)
export class AgencyFieldResolver {
  @FieldResolver(() => InstagramStats, { nullable: true })
  async instagramStats(@Root() user: AgencyDB): Promise<InstagramStats | null> {
    return getInstagramStats(user);
  }
  @FieldResolver(() => [InstagramMedia], { nullable: true })
  async instagramMedia(
    @Root() user: AgencyDB,
  ): Promise<InstagramMedia[] | null> {
    return getInstagramMedia(user, true);
  }
}
