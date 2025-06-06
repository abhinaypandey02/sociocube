import type { Context } from "@backend/lib/auth/context";
import type { SubscriptionDB } from "@graphql/Subscription/db";
import { SubscriptionGQL, UsageGQL } from "@graphql/Subscription/type";
import { getPendingUsage } from "@graphql/Subscription/utils";
import { Arg, Ctx, FieldResolver, Int, Resolver, Root } from "type-graphql";

import { MaxUsages, UsageType } from "@/lib/usages";

@Resolver(() => SubscriptionGQL)
export class SubscriptionFieldResolver {
  @FieldResolver(() => UsageGQL)
  async usages(@Root() subscription: SubscriptionDB) {
    return subscription;
  }
}

@Resolver(() => UsageGQL)
export class UsageFieldResolver {
  @FieldResolver(() => Int)
  async [UsageType.AiSearch](
    @Ctx() ctx: Context,
    @Root() subscription: SubscriptionDB,
  ) {
    if (!ctx.userId) return 0;
    return getPendingUsage({
      userID: ctx.userId,
      feature: UsageType.AiSearch,
      plan: subscription?.plan,
    });
  }
  @FieldResolver(() => Int)
  async [UsageType.GlobalAnnouncement](
    @Ctx() ctx: Context,
    @Root() subscription: SubscriptionDB,
  ) {
    if (!ctx.userId) return 0;
    return getPendingUsage({
      plan: subscription.plan,
      feature: UsageType.PostingAnnouncement,
      thresholdUsage: MaxUsages.GlobalAnnouncement,
      userID: ctx.userId,
    });
  }
  @FieldResolver(() => Int)
  async [UsageType.PostingAnnouncement](
    @Ctx() ctx: Context,
    @Root() subscription: SubscriptionDB,
    @Arg("postingID", () => Int) postingID: number,
  ) {
    if (!ctx.userId) return 0;
    return getPendingUsage({
      plan: subscription.plan,
      feature: UsageType.PostingAnnouncement,
      thresholdHours: 0,
      userID: ctx.userId,
      key: postingID,
    });
  }
}
