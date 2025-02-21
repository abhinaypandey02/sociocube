import {
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { LocationTable, UserTable } from "../../User/db/schema";
import { InstagramDetails } from "../../Instagram/db/schema";
import { AgencyMemberType } from "../../../constants/agency-member-type";
import { Roles } from "../../../constants/roles";
import { AgencyCategory } from "../../../constants/agency-category";

export const agencyRolesEnum = pgEnum("agency_role", [
  Roles.ADMIN,
  Roles.ReferralCreator,
  Roles.ManuallyVerified,
]);
export const agencyCategoryEnum = pgEnum("agency_category", [
  AgencyCategory.Agency,
  AgencyCategory.Brand,
]);
export const AgencyTable = pgTable(
  "agency",
  {
    id: serial("id").unique(),
    name: text("name").notNull(),
    photo: text("photo").notNull(),
    contactEmail: text("contact_email").notNull(),
    contactPhone: text("contact_phone"),
    location: integer("location")
      .references(() => LocationTable.id)
      .notNull(),
    bio: text("bio").notNull(),
    roles: agencyRolesEnum("role").array().notNull(),
    category: agencyCategoryEnum("category")
      .notNull()
      .default(AgencyCategory.Brand),
    username: text("username").notNull(),
    instagramDetails: integer("instagram_details").references(
      () => InstagramDetails.id,
    ),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    userSearchIndex: index("agency_search_index").using(
      "gin",
      sql`(
        to_tsvector('english', ${table.name}) || 
        to_tsvector('english', ${table.username})
        )`,
    ),
  }),
);
export const AgencyOnboardingTable = pgTable("agency_onboarding", {
  id: serial("id").unique(),
  name: text("name").notNull(),
  photo: text("photo"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  bio: text("bio").notNull(),
  category: agencyCategoryEnum("category").default(AgencyCategory.Brand),
  username: text("username"),
  instagramDetails: integer("instagram_details")
    .references(() => InstagramDetails.id)
    .notNull(),
  user: integer("user")
    .references(() => UserTable.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const agencyMemberType = pgEnum("agency_member_type", [
  AgencyMemberType.Admin,
  AgencyMemberType.Owner,
]);

export const AgencyMember = pgTable("agency_member", {
  id: serial("id").unique(),
  user: integer("user")
    .references(() => UserTable.id)
    .notNull(),
  agency: integer("agency")
    .references(() => AgencyTable.id)
    .notNull(),
  type: agencyMemberType("type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AgencyDB = typeof AgencyTable.$inferSelect;
export type AgencyMemberDB = typeof AgencyMember.$inferSelect;
