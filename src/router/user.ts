import { Router, Request, Response } from "express"

import UserInterface from "../interfaces/user.interface"

const userRouter = Router()

userRouter.get("/", (req: Request, res: Response) => {
  const users: UserInterface[] = [
    {
      name: "Jitendra",
      email: "jeetnirnejak@gmail.com",
      contact: "7869290297",
    },
  ]
  res.json({ users })
})

export default userRouter
