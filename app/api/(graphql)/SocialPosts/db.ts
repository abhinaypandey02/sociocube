import { index, integer, pgTable, text } from "drizzle-orm/pg-core";

export const SocialPostsTable = pgTable(
  "social_posts",
  {
    id: integer("id").notNull(),
    body: text("body").notNull(),
    platform: text("platform").notNull(),
  },
  (table) => ({
    postingIdPlatformIndex: index("posting_id_platform").on(
      table.platform,
      table.id,
    ),
  }),
);
