import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  char,
  index,
  numeric,
  pgTable,
  smallint,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const StateTable = pgTable(
  "states",
  {
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    countryId: bigint("country_id", { mode: "number" })
      .notNull()
      .references(() => CountryTable.id),
    countryCode: char("country_code", { length: 2 }).notNull(),
    fipsCode: varchar("fips_code", { length: 255 }),
    iso2: varchar("iso2", { length: 255 }),
    type: varchar("type", { length: 191 }),
    latitude: numeric("latitude", { precision: 10, scale: 8 }).notNull(),
    longitude: numeric("longitude", { precision: 11, scale: 8 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    flag: smallint("flag")
      .default(sql`1`)
      .notNull(),
    wikiDataId: varchar("wikiDataId", { length: 255 }),
  },
  (table) => ({
    stateNameFuzzyIndex: index("state_name_fuzzy_idx").using(
      "gin",
      sql`noaccent(${table.name}) gin_trgm_ops`,
    ),
  }),
);

export const RegionTable = pgTable("regions", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  translations: text("translations"),
  createdAt: timestamp("created_at", { mode: "string" }),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
  flag: smallint("flag")
    .default(sql`1`)
    .notNull(),
  wikiDataId: varchar("wikiDataId", { length: 255 }),
});

export const CityTable = pgTable(
  "cities",
  {
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    stateId: bigint("state_id", { mode: "number" })
      .notNull()
      .references(() => StateTable.id),
    stateCode: varchar("state_code", { length: 255 }),
    countryId: bigint("country_id", { mode: "number" })
      .notNull()
      .references(() => CountryTable.id),
    countryCode: char("country_code", { length: 2 }).notNull(),
    latitude: numeric("latitude", { precision: 10, scale: 8 }).notNull(),
    longitude: numeric("longitude", { precision: 11, scale: 8 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    flag: smallint("flag")
      .default(sql`1`)
      .notNull(),
    wikiDataId: varchar("wikiDataId", { length: 255 }),
    duplicate: boolean("duplicate").default(false),
  },
  (table) => ({
    countryIdx: index("country_idx").on(table.countryId),
    countryCodeIdx: index("country_code_idx").on(table.countryCode),
    stateIdx: index("state_idx").on(table.stateId),
    nameFuzzyIndex: index("name_fuzzy_idx").using(
      "gin",
      sql`noaccent(${table.name}) gin_trgm_ops`,
    ),
  }),
);

export const CountryTable = pgTable("countries", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  iso3: char("iso3", { length: 3 }),
  numericCode: char("numeric_code", { length: 3 }),
  iso2: char("iso2", { length: 2 }).unique().notNull(),
  phonecode: varchar("phonecode", { length: 255 }),
  capital: varchar("capital", { length: 255 }),
  currency: varchar("currency", { length: 255 }),
  currencyName: varchar("currency_name", { length: 255 }),
  currencySymbol: varchar("currency_symbol", { length: 255 }).notNull(),
  tld: varchar("tld", { length: 255 }),
  native: varchar("native", { length: 255 }),
  region: varchar("region", { length: 255 }),
  regionId: bigint("region_id", { mode: "number" }).references(
    () => RegionTable.id,
  ),
  subregion: varchar("subregion", { length: 255 }),
  subregionId: bigint("subregion_id", { mode: "number" }),
  nationality: varchar("nationality", { length: 255 }),
  timezones: text("timezones"),
  translations: text("translations"),
  latitude: numeric("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: numeric("longitude", { precision: 11, scale: 8 }).notNull(),
  emoji: varchar("emoji", { length: 191 }),
  emojiU: varchar("emojiU", { length: 191 }),
  createdAt: timestamp("created_at", { mode: "string" }),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
  flag: smallint("flag")
    .default(sql`1`)
    .notNull(),
  wikiDataId: varchar("wikiDataId", { length: 255 }),
});
