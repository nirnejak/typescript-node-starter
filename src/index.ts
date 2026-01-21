import { Hono } from "hono"
import { logger } from "hono/logger"
import { secureHeaders } from "hono/secure-headers"

import userRoutes from "./router/user"
import waitlistRoutes from "./router/waitlist"

const app = new Hono()

app.use(logger())
app.use(secureHeaders())

app.get("/", (c) => {
  return c.text("Hello Hono!")
})

app.route("/api/user", userRoutes)
app.route("/api/waitlist", waitlistRoutes)

export default app

// eslint-disable-next-line "@typescript-eslint/no-explicit-any"
process.on("unhandledRejection", (reason: string, p: Promise<any>) => {
  console.log(p)
  throw new Error(reason)
})

process.on("uncaughtException", (error: Error) => {
  console.error(error)
  process.exit(1)
})
