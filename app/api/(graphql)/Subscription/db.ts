import { USAGE_TYPES } from "@graphql/Subscription/constants";
import { plansEnum, planStatusEnum, UserTable } from "@graphql/User/db";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const SubscriptionTable = pgTable("subscription", {
  user: integer("user")
    .unique()
    .references(() => UserTable.id)
    .notNull(),
  subscriptionID: text("subscription_id").unique(),
  plan: plansEnum("plan"),
  nextBilling: timestamp("next_billing"),
  status: planStatusEnum("status"),
});

export const usageType = pgEnum("usage_type", USAGE_TYPES);

export const UsageTable = pgTable("usage", {
  id: serial("id").primaryKey(),
  entityKey: integer("entity_key"),
  user: integer("user")
    .references(() => UserTable.id)
    .notNull(),
  type: usageType("type").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
