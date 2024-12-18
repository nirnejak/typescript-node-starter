import type { PinoLoggerOptions } from "fastify/types/logger"

export const getLoggerConfig = (): boolean | PinoLoggerOptions => {
  let config: PinoLoggerOptions = {}

  switch (process.env.NODE_ENV) {
    case "production":
      return true
    case "test":
      return false
    case "development":
    default:
      config = {
        transport: {
          target: "pino-pretty",
          options: {
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
          },
        },
      }
      return config
  }
}
