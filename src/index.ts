import express, { Application, Request, Response } from "express"

import userRouter from "./router/user"
import logger from "./middlewares/logger"
require("dotenv").config()

const app: Application = express()

app.use(logger)
app.use("/user", userRouter)

app.get("/", (req: Request, res: Response) => {
  res.locals = { name: "Jitendra Nirnejak" }
  res.send(`Hello Typescript!`)
})

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`)
})
