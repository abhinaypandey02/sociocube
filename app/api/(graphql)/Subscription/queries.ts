import type { Context } from "@backend/lib/auth/context";
import { handleGetSubscription } from "@graphql/Subscription/resolvers/get-subscription";
import { handleGetSubscriptionLink } from "@graphql/Subscription/resolvers/get-subscription-link";
import { SubscriptionGQL } from "@graphql/Subscription/type";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class SubscriptionQueryResolver {
  @Query(() => SubscriptionGQL, { nullable: true })
  async getSubscription(@Ctx() ctx: Context) {
    return handleGetSubscription(ctx);
  }
  @Query(() => String, { nullable: true })
  async getSubscriptionLink(@Ctx() ctx: Context) {
    return handleGetSubscriptionLink(ctx);
  }
}
