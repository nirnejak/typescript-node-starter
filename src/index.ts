import Fastify from "fastify"
import dotenv from "dotenv"
import helmet from "@fastify/helmet"

import errorHandlerPlugin from "./plugins/errorHandlerPlugin"
import { getLoggerConfig } from "./utils/logger"

import userRoutes from "./router/user"
import waitlistRoutes from "./router/waitlist"

dotenv.config()

const fastify = Fastify({
  logger: getLoggerConfig(),
})

fastify.register(helmet, { global: true })

fastify.addHook("onRequest", (request, reply, done) => {
  fastify.log.info("Got a request")
  done()
})

fastify.addHook("onResponse", (request, reply, done) => {
  fastify.log.info(`Responding`)
  done()
})

fastify.get("/", () => {
  return {
    message: "Hello Fastify!",
  }
})

// Error handling plugin
fastify.register(errorHandlerPlugin)

// Routes
fastify.register(userRoutes)
fastify.register(waitlistRoutes)

const main = async (): Promise<void> => {
  await fastify.listen({
    port: parseInt(process.env.PORT ?? "5000"),
    host: "0.0.0.0",
  })
}

// eslint-disable-next-line "@typescript-eslint/no-floating-promises"
main()

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
