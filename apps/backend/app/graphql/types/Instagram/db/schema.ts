import { pgTable, text, integer, index, serial } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const InstagramDetails = pgTable(
  "instagram_data",
  {
    id: serial("id").primaryKey(),
    username: text("username").unique().notNull(),
    appID: text("app_id").unique(),
    igID: text("ig_id").unique(),
    followers: integer("followers").notNull(),
    mediaCount: integer("media_count").notNull().default(0),
    accessToken: text("access_token"),
  },
  (table) => ({
    instagramSearchIndex: index("instagram_search_index").using(
      "gin",
      sql`to_tsvector('english', ${table.username})`,
    ),
    followersIdx: index("followers_idx").on(table.followers),
  }),
);
