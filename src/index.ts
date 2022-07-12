import express, { Application, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"

import userRouter from "./router/user"
import requestLogger from "./middlewares/requestLogger"
import errorHandler from "./middlewares/errorHandler"

dotenv.config()
const app: Application = express()

app.use(cors())
app.use(requestLogger)

app.get("/", (req: Request, res: Response) => {
  res.locals = { name: "Jitendra Nirnejak" }
  res.send(`Hello Typescript!`)
})

// Routes
app.use("/api/user", userRouter)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`)
})

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
