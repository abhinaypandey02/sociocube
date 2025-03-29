import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/api/graphql/types/*/db/schema*.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL || "",
  },
});
