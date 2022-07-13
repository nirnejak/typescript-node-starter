import { Request, Response } from "express"

/**
 * @route GET /api/users
 * @access Public
 * @param req Request Object
 * @param res Response Object
 * @description Get Users
 */
const getUsers = (req: Request, res: Response) => {
  const users = [
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
