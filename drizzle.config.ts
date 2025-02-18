import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { defineConfig } from "drizzle-kit"

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle({ client: sql })

export default defineConfig({
  schema: "**/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
})
