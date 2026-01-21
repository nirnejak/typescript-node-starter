import { Hono } from "hono"

import userRoutes from "./router/user"
import waitlistRoutes from "./router/waitlist"

const app = new Hono()

// TODO: setup a logger
// TODO: setup helmet for security headers
// TODO: add error handling plugin

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
  // INFO: if you want to quit the process(usually when the error is unknown), only after properly logging it
  process.exit(1)
})
