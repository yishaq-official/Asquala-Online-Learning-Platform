import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load environment variables from .env
config({ path: ".env" });

export default defineConfig({
  schema: "./db/schema/*",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
