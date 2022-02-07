import express, { Application, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"

import userRouter from "./router/user"
import logger from "./middlewares/logger"
import errorHandler from "./middlewares/errorHandler"

dotenv.config()
const app: Application = express()

app.use(cors())
app.use(logger)

app.get("/", (req: Request, res: Response) => {
  res.locals = { name: "Jitendra Nirnejak" }
  res.send(`Hello Typescript!`)
})

// Routes
app.use("/user", userRouter)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`)
})
