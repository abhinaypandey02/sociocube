import { pgTable, text, integer, serial, boolean } from "drizzle-orm/pg-core";
import { UserTable } from "../../User/db/schema";
import { CountryTable } from "../../Map/db/schema";

export const PostingTable = pgTable("posting", {
  id: serial("id").primaryKey(),
  user: integer("user")
    .references(() => UserTable.id)
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  currency: text("currency").references(() => CountryTable.currency),
  price: integer("price"),
  barter: boolean("barter").default(false).notNull(),
  minimumInstagramFollower: integer("minimum_instagram_follower")
    .default(0)
    .notNull(),
  minimumAge: integer("minimum_age").default(0).notNull(),
  maximumAge: integer("maximum_age").default(1000).notNull(),
  open: boolean("open").default(true).notNull(),
});

export type PostingDB = typeof PostingTable.$inferSelect;
