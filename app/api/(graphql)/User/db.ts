import { Roles } from "@backend/lib/constants/roles";
import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  real,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import categories from "@/constants/categories";
import genders from "@/constants/genders";

import { InstagramDetails } from "../Instagram/db";
import { CityTable, CountryTable } from "../Map/db";

export const rolesEnum = pgEnum("role", [
  Roles.Admin,
  Roles.Brand,
  Roles.Agency,
  Roles.Creator,
]);
export const gendersEnum = pgEnum("genders", genders as [string, ...string[]]);
export const categoriesEnum = pgEnum(
  "categories",
  categories.sort((a, b) => a.id - b.id).map((category) => category.title) as [
    string,
    ...string[],
  ],
);

export const UserTable = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    name: text("name"),
    bio: text("bio"),
    username: text("username").unique(),
    email: text("email").unique(),
    emailVerified: boolean("email_verified").default(false),
    instagramDetails: integer("instagram_details").references(
      () => InstagramDetails.id,
    ),
    password: text("password"),
    phone: text("phone"),
    photo: text("photo"),
    role: rolesEnum("role").default(Roles.Creator).notNull(),
    stripeSubscriptionID: text("stripe_subscription_id"),
    location: integer("location").references(() => LocationTable.id),
    category: categoriesEnum("category"),
    dob: date("dob"),
    gender: gendersEnum("gender"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    userSearchBioIndex: index("user_search_index").using(
      "gin",
      sql`(to_tsvector('english', ${table.bio}))`,
    ),
    userSearchNameIndex: index("user_search_name_index").using(
      "gin",
      sql`(${table.name} || ' ' || ${table.username}) gin_trgm_ops`,
    ),
    categoryIdx: index("category_idx").on(table.category),
    genderIdx: index("gender_idx").on(table.gender),
    dobIdx: index("dob_idx").on(table.dob),
    emailIdx: index("email_idx").on(table.email),
    usernameIdx: index("username_idx").on(table.username),
  }),
);

export const LocationTable = pgTable("location", {
  id: serial("id").primaryKey(),

  city: integer("city").references(() => CityTable.id),
  country: integer("country")
    .notNull()
    .references(() => CountryTable.id),
});
export const PricingTable = pgTable("pricing", {
  starting: real("starting"),
  user: integer("user")
    .primaryKey()
    .references(() => UserTable.id),
});
export type UserDBInsert = typeof UserTable.$inferInsert;
export type UserDB = typeof UserTable.$inferSelect;
