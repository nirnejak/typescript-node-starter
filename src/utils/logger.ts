// eslint-disable-next-line "@typescript-eslint/no-explicit-any"
export const getLoggerConfig = (): boolean | any => {
  switch (process.env.NODE_ENV) {
    case "production":
      return true
    case "test":
      return false
    case "development":
    default:
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
