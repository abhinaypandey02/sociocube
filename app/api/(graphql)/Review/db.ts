import {
  integer,
  pgTable,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { PostingTable } from "../Posting/db";
import { UserTable } from "../User/db";

export const ReviewTable = pgTable(
  "review",
  {
    id: serial("id").unique(),
    user: integer("user")
      .references(() => UserTable.id)
      .notNull(),
    userRating: real("user_rating").notNull(),
    userFeedback: text("user_feedback"),
    agency: integer("agency").references(() => UserTable.id),
    agencyRating: real("agency_rating"),
    agencyFeedback: text("agency_feedback"),
    posting: integer("posting")
      .references(() => PostingTable.id)
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    userPostingPrimaryKey: primaryKey({ columns: [table.user, table.posting] }),
  }),
);

export type ReviewDB = typeof ReviewTable.$inferSelect;
