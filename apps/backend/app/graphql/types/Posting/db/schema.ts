import {
  pgTable,
  text,
  integer,
  serial,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { UserTable } from "../../User/db/schema";
import { CountryTable } from "../../Map/db/schema";

export const PostingTable = pgTable("posting", {
  id: serial("id").primaryKey(),
  user: integer("user")
    .references(() => UserTable.id)
    .notNull(),
  title: text("title").notNull(),
  deliverables: text("deliverables").array(),
  externalLink: text("external_link"),
  description: text("description").notNull(),
  currencyCountry: integer("currency_country").references(
    () => CountryTable.id,
  ),
  price: integer("price"),
  barter: boolean("barter").default(false).notNull(),
  minimumInstagramFollower: integer("minimum_instagram_follower")
    .default(0)
    .notNull(),
  minimumAge: integer("minimum_age").default(0).notNull(),
  maximumAge: integer("maximum_age").default(1000).notNull(),
  open: boolean("open").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type PostingDB = typeof PostingTable.$inferSelect;
