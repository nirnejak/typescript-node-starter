"use strict"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "**/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: Bun.env.DATABASE_URL!,
  },
})
