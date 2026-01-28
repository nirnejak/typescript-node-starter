import { Hono } from "hono"
import { stream } from "hono/streaming"

const streamRoute = new Hono()

streamRoute.get("/", (c) => {
  return stream(c, async (stream) => {
    await stream.writeln("Stream 1")
    await stream.sleep(1000)
    await stream.writeln("Stream 2")
    await stream.sleep(1000)
    await stream.writeln("Stream 3")
    await stream.sleep(1000)
    await stream.writeln("Stream 4")
    await stream.sleep(1000)
    await stream.writeln("Stream 5")
    await stream.close()
  })
})

export default streamRoute
