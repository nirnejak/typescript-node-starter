import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

import { db } from "./db"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    google: {
      clientId: Bun.env.AUTH_GOOGLE_ID!,
      clientSecret: Bun.env.AUTH_GOOGLE_SECRET!,
    },
  },
})
