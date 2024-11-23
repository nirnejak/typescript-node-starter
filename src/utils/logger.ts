export const getLoggerConfig = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return true
    case "test":
      return false
    case "development":
      return {
        transport: {
          target: "pino-pretty",
          options: {
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
          },
        },
      }
  }
}
