import { PostingPlatforms } from "@backend/lib/constants/platforms";
import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { CountryTable } from "../Map/db";
import { UserTable } from "../User/db";

export const platforms = pgEnum("platform", [
  PostingPlatforms.INSTAGRAM,
  PostingPlatforms.YOUTUBE,
]);

export const PostingTable = pgTable(
  "posting",
  {
    id: serial("id").primaryKey(),
    agency: integer("agency")
      .references(() => UserTable.id)
      .notNull(),
    title: text("title").notNull(),
    platforms: platforms("platforms").array().notNull().default([]),
    deliverables: text("deliverables").array(),
    externalLink: text("external_link").unique(),
    extraDetails: text("extra_details"),
    description: text("description").notNull(),
    currencyCountry: integer("currency_country").references(
      () => CountryTable.id,
    ),
    price: integer("price"),
    barter: boolean("barter").default(false).notNull(),
    minimumFollowers: integer("minimum_followers").default(0),
    minimumAge: integer("minimum_age").default(0),
    maximumAge: integer("maximum_age").default(1000),
    open: boolean("open").default(true).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => ({
    userSearchIndex: index("posting_search_index").using(
      "gin",
      sql`(
        to_tsvector('english', ${table.title}) || 
        to_tsvector('english', ${table.description})
        )`,
    ),
  }),
);

export type PostingDB = typeof PostingTable.$inferSelect;
