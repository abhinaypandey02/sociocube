import {
  SubscriptionPlan,
  SubscriptionPlanStatus,
} from "@graphql/Subscription/constants";
import { Field, ObjectType } from "type-graphql";

@ObjectType("Subscription")
export class SubscriptionGQL {
  @Field(() => SubscriptionPlan)
  plan: SubscriptionPlan;
  @Field(() => SubscriptionPlanStatus, { nullable: true })
  status: SubscriptionPlanStatus;
  @Field(() => Number, { nullable: true })
  nextBilling: Date;
}
