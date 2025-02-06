import { pgTable, text, integer, serial } from "drizzle-orm/pg-core";
import { UserTable } from "../../User/db/schema";

export const PortfolioTable = pgTable("portfolio", {
  id: serial("id").unique(),
  user: integer("user")
    .references(() => UserTable.id)
    .notNull(),
  imageURL: text("image_url"),
  link: text("link"),
  caption: text("caption"),
});

export type PortfolioDB = typeof PortfolioTable.$inferSelect;
