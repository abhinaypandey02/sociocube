import {
  pgTable,
  text,
  integer,
  serial,
  primaryKey,
} from "drizzle-orm/pg-core";
import { UserTable } from "../../User/db/schema";
import { PostingTable } from "../../Posting/db/schema";

export const ApplicationTable = pgTable(
  "application",
  {
    id: serial("id").unique(),
    user: integer("user")
      .references(() => UserTable.id)
      .notNull(),
    posting: integer("posting")
      .references(() => PostingTable.id)
      .notNull(),
    email: text("email").notNull(),
    comment: text("comment"),
  },
  (table) => ({
    userPostingPrimaryKey: primaryKey({ columns: [table.user, table.posting] }),
  }),
);

export type ApplicationDB = typeof ApplicationTable.$inferSelect;
