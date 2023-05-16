import Fastify, { FastifyReply } from "fastify"
import dotenv from "dotenv"

import userRoutes from "./router/user"
import opsRoutes from "./router/ops"

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
}

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
fastify.register(userRoutes, { prefix: "/api/users" })
fastify.register(opsRoutes, { prefix: "/api/ops" })

// TODO: Add error middleware/plugin

async function main() {
  await fastify.listen({
    port: parseInt(process.env.PORT as string),
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
