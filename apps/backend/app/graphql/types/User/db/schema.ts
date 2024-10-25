import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  date,
  index,
} from "drizzle-orm/pg-core";
import categories from "commons/categories";
import genders from "commons/genders";
import { sql } from "drizzle-orm";
import { Roles } from "../../../constants/roles";
import { AuthScopes } from "../../../constants/scopes";
import { InstagramDetails } from "../../Instagram/db/schema";
import { CityTable } from "../../Map/db/schema";

export const rolesEnum = pgEnum("role", [Roles.SELLER]);
export const authScopesEnum = pgEnum("scope", [
  AuthScopes.GOOGLE,
  AuthScopes.INSTAGRAM,
  AuthScopes.EMAIL,
  AuthScopes.PHONE,
]);
export const gendersEnum = pgEnum("genders", genders as [string, ...string[]]);
export const categoriesEnum = pgEnum(
  "categories",
  categories.map((category) => category.title) as [string, ...string[]],
);

export const UserTable = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    name: text("name"),
    bio: text("bio"),
    email: text("email").unique(),
    instagramDetails: text("instagram_details").references(
      () => InstagramDetails.id,
    ),
    password: text("password"),
    phone: text("phone"),
    photo: text("photo"),
    refreshTokens: text("refresh_tokens").array(),
    scopes: authScopesEnum("scope").array().notNull(),
    roles: rolesEnum("role").array().notNull(),
    otp: integer("otp_id").references(() => OTPTable.id),
    onboardingData: integer("onboarding_data").references(
      () => OnboardingDataTable.id,
    ),
    isOnboarded: boolean("is_onboarded").default(false),
    stripeConnectedAccountID: text("stripe_connected_account_id"),
    stripeSubscriptionID: text("stripe_subscription_id"),
    city: integer("city").references(() => CityTable.id),
    category: categoriesEnum("category"),
    dob: date("dob"),
    gender: gendersEnum("gender"),
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
    cityIdx: index("city_idx").on(table.city),
  }),
);

export const OTPTable = pgTable("otp", {
  id: serial("id").primaryKey(),
  code: text("code"),
  requestedAt: timestamp("requestedAt"),
});
export const OnboardingDataTable = pgTable("onboarding_data", {
  id: serial("id").primaryKey(),
  name: text("name"),
  bio: text("bio"),
  photo: text("photo"),
  city: integer("city").references(() => CityTable.id),
  category: categoriesEnum("category"),
  dob: date("dob"),
  gender: gendersEnum("gender"),
});

export type UserDBInsert = typeof UserTable.$inferInsert;
export type UserDB = typeof UserTable.$inferSelect;
