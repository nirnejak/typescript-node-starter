import { Request, Response, NextFunction } from "express"

import utils from "../utils"

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${
      req.originalUrl
    } : ${utils.formatToDateTime(new Date())}`
  )
  next()
}

export default requestLogger
