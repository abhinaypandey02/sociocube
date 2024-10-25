import { pgTable, text, integer, index } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const InstagramDetails = pgTable(
  "instagram_data",
  {
    id: text("id").primaryKey().notNull(),
    username: text("username"),
    followers: integer("followers"),
    accessToken: text("access_token").notNull(),
  },
  (table) => ({
    instagramSearchIndex: index("instagram_search_index").using(
      "gin",
      sql`to_tsvector('english', ${table.username})`,
    ),
  }),
);
