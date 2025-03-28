import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { UserTable } from "../../User/db/schema";

export const PortfolioTable = pgTable("portfolio", {
  id: serial("id").unique(),
  user: integer("user")
    .references(() => UserTable.id)
    .notNull(),
  agency: integer("agency").references(() => UserTable.id),
  imageURL: text("image_url"),
  link: text("link"),
  caption: text("caption"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type PortfolioDB = typeof PortfolioTable.$inferSelect;
