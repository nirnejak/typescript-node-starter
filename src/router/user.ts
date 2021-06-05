import { Router, Request, Response } from "express"

import IUser from "../interfaces/user.interface"

const userRouter = Router()

userRouter.get("/", (req: Request, res: Response) => {
  const users: IUser[] = [
    {
      name: "Jitendra",
      email: "jeetnirnejak@gmail.com",
      contact: "7869290297",
    },
  ]
  res.json({ users })
})

export default userRouter
