import chalk from "chalk"
import { Request, Response, NextFunction } from "express"

import utils from "../utils"

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `${chalk.white.bold.inverse(` ${req.method} `)} ${req.protocol}://${req.get(
      "host"
    )}${req.originalUrl} : ${utils.formatToDateTime(new Date())}`
  )
  next()
}

export default logger
