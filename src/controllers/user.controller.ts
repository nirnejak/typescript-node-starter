import { Request, Response } from "express"

import IUser from "../interfaces/user.interface"

/**
 * @route GET /api/users
 * @access Public
 * @param req Request Object
 * @param res Response Object
 * @description Get Users
 */
const getUsers = (req: Request, res: Response) => {
  const users: IUser[] = [
    {
      name: "Jitendra",
      email: "jeetnirnejak@gmail.com",
      contact: "7869290297",
    },
  ]
  res.json({ users })
}

export default {
  getUsers,
}
