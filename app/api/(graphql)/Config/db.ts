import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const ConfigTable = pgTable("subscription", {
  key: text("key").primaryKey(),
  value: text("value"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ConfigDB = typeof ConfigTable.$inferSelect;
