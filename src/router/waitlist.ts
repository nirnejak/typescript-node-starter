import { Hono } from "hono"

import { allWaitlists, addToWaitlist } from "@/controllers/waitlist"

const waitlist = new Hono()

waitlist.get("/", async (c) => {
  const waitlist = await allWaitlists()
  return c.json(waitlist, 200)
})

waitlist.post("/", async (c) => {
  const body = await c.req.json()
  const res = await addToWaitlist(body.email)
  return c.json(res, 201)
})

export default waitlist
