import Fastify, { FastifyReply } from "fastify"
import dotenv from "dotenv"

import userRouter from "./router/user"

dotenv.config()
const fastify = Fastify({
  // logger: envToLogger[environment] ?? true,
  logger: true,
})

fastify.addHook("onRequest", async () => {
  fastify.log.info("Got a request")
})

fastify.addHook("onResponse", async (request, reply: FastifyReply) => {
  fastify.log.info(`Responding ${reply.getResponseTime()}`)
})

fastify.get("/", async () => {
  return {
    message: "Hello Fastify!",
  }
})

// Routes
fastify.register(userRouter, {
  prefix: "/api/users",
})

// TODO: Add error middleware/plugin

async function main() {
  await fastify.listen({
    port: process.env.PORT as number,
    host: "0.0.0.0",
  })
}

main()

process.on("unhandledRejection", (reason: string, p: Promise<any>) => {
  console.log(p)
  throw reason
})

process.on("uncaughtException", (error: Error) => {
  // TODO: Handle error here
  console.error(error)
  // INFO: if you want to quit the process(usually when the error is unknown), only after properly logging it
  // process.exit(1)
})
