import { pgTable, text, integer, index, serial } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const InstagramDetails = pgTable(
  "instagram_data",
  {
    id: serial("id").primaryKey(),
    username: text("username").unique().notNull(),
    appID: text("app_id").unique(),
    followers: integer("followers").notNull(),
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
