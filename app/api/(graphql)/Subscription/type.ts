import { SubscriptionPlanStatus } from "@graphql/Subscription/constants";
import { Field, ObjectType } from "type-graphql";

import { SubscriptionPlan, UsageType } from "@/lib/usages";

@ObjectType("SubscriptionGQL")
export class SubscriptionGQL {
  @Field(() => SubscriptionPlan, { nullable: true })
  plan: SubscriptionPlan;
  @Field(() => SubscriptionPlanStatus, { nullable: true })
  status: SubscriptionPlanStatus;
  @Field(() => Number, { nullable: true })
  nextBilling: Date;
}

@ObjectType("Usage")
export class UsageGQL {
  @Field()
  [UsageType.PostingAnnouncement]: number;
  @Field()
  [UsageType.GlobalAnnouncement]: number;
  @Field()
  [UsageType.AiSearch]: number;
}
