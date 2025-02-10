import { pgTable, text, integer, serial } from "drizzle-orm/pg-core";
import { UserTable } from "../../User/db/schema";
import { AgencyTable } from "../../Agency/db/schema";

export const PortfolioTable = pgTable("portfolio", {
  id: serial("id").unique(),
  user: integer("user").references(() => UserTable.id),
  agency: integer("agency").references(() => AgencyTable.id),
  imageURL: text("image_url"),
  link: text("link"),
  caption: text("caption"),
});

export type PortfolioDB = typeof PortfolioTable.$inferSelect;
