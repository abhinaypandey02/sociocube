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
import categories from "commons/categories";
import genders from "commons/genders";
import { sql } from "drizzle-orm";
import { Roles } from "../../../constants/roles";
import { InstagramDetails } from "../../Instagram/db/schema";
import { CityTable, CountryTable, StateTable } from "../../Map/db/schema";
import { InstagramMediaType } from "../../../constants/instagram-media-type";

export const mediaType = pgEnum("media_type", [
  InstagramMediaType.Image,
  InstagramMediaType.Video,
  InstagramMediaType.CarouselAlbum,
]);
export const rolesEnum = pgEnum("role", [
  Roles.ADMIN,
  Roles.ReferralCreator,
  Roles.ManuallyVerified,
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
    contactEmail: text("contact_email"),
    instagramDetails: integer("instagram_details").references(
      () => InstagramDetails.id,
    ),
    password: text("password"),
    phone: text("phone"),
    photo: text("photo"),
    refreshTokens: text("refresh_tokens").array(),
    roles: rolesEnum("role").array().notNull(),
    isOnboarded: boolean("is_onboarded").default(false),
    stripeSubscriptionID: text("stripe_subscription_id"),
    location: integer("location").references(() => LocationTable.id),
    category: categoriesEnum("category"),
    dob: date("dob"),
    gender: gendersEnum("gender"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    userSearchIndex: index("user_search_index").using(
      "gin",
      sql`(
        to_tsvector('english', ${table.name}) || 
        to_tsvector('english', ${table.bio})
        )`,
    ),
    categoryIdx: index("category_idx").on(table.category),
    genderIdx: index("gender_idx").on(table.gender),
    dobIdx: index("dob_idx").on(table.dob),
    emailIdx: index("email_idx").on(table.email),
    usernameIdx: index("username_idx").on(table.username),
  }),
);

export const OTPTable = pgTable("otp", {
  id: serial("id").primaryKey(),
  code: text("code"),
  requestedAt: timestamp("requestedAt"),
});
export const LocationTable = pgTable("location", {
  id: serial("id").primaryKey(),

  city: integer("city").references(() => CityTable.id),
  state: integer("state").references(() => StateTable.id),
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
