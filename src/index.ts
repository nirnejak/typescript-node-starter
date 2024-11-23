import Fastify from "fastify"
import dotenv from "dotenv"
import helmet from "@fastify/helmet"

import userRoutes from "./router/user"
import errorHandlerPlugin from "./plugins/errorHandlerPlugin"
import { getLoggerConfig } from "./utils/logger"

dotenv.config()

const fastify = Fastify({
  logger: getLoggerConfig(),
})

fastify.register(helmet, { global: true })

fastify.addHook("onRequest", async () => {
  fastify.log.info("Got a request")
})

fastify.addHook("onResponse", async () => {
  fastify.log.info(`Responding`)
})

fastify.get("/", async () => {
  return {
    message: "Hello Fastify!",
  }
})

// Error handling plugin
fastify.register(errorHandlerPlugin)

// Routes
fastify.register(userRoutes, { prefix: "/api/users" })

async function main(): Promise<void> {
  await fastify.listen({
    port: parseInt(process.env.PORT ?? "5000"),
    host: "0.0.0.0",
  })
}

main()

// eslint-disable-next-line "@typescript-eslint/no-explicit-any"
process.on("unhandledRejection", (reason: string, p: Promise<any>) => {
  console.log(p)
  // eslint-disable-next-line "@typescript-eslint/no-throw-literal"
  throw reason
})

process.on("uncaughtException", (error: Error) => {
  // TODO: Handle error here
  console.error(error)
  // INFO: if you want to quit the process(usually when the error is unknown), only after properly logging it
  // process.exit(1)
})
