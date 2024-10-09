import { pgTable, text } from "drizzle-orm/pg-core";

export const InstagramDetails = pgTable("instagram_data", {
  id: text("id").primaryKey().notNull(),
  accessToken: text("access_token").notNull(),
});
