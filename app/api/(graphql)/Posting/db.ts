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

import { CityTable, CountryTable, StateTable } from "../Map/db";
import { gendersEnum, UserTable } from "../User/db";

export const platforms = pgEnum("platform", [
  PostingPlatforms.INSTAGRAM,
  PostingPlatforms.YOUTUBE,
  PostingPlatforms.TIKTOK,
  PostingPlatforms.LINKEDIN,
  PostingPlatforms.FACEBOOK,
  PostingPlatforms.X,
]);

export const PostingTable = pgTable(
  "posting",
  {
    id: serial("id").primaryKey(),
    agency: integer("agency")
      .references(() => UserTable.id)
      .notNull(),
    title: text("title").notNull(),
    platform: platforms("platform").notNull(),
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
    minimumAge: integer("minimum_age"),
    maximumAge: integer("maximum_age"),
    countries: integer("countries")
      .references(() => CountryTable.id)
      .array(),
    cities: integer("cities")
      .references(() => CityTable.id)
      .array(),
    states: integer("states")
      .references(() => StateTable.id)
      .array(),
    gender: gendersEnum("gender"),
    open: boolean("open").default(true).notNull(),
    inReview: boolean("in_review").default(true).notNull(),
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
