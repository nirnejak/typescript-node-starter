import { Hono } from "hono"

const user = new Hono()

user.get("/", (c) => {
  const users = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
  ]
  return c.json(users, 200)
})

user.post("/", async (c) => {
  const body = await c.req.json()
  return c.json(body, 201)
})

export default user
