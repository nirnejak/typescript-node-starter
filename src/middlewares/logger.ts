import { format } from "date-fns";
import chalk from "chalk";
import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `${chalk.white.bold.inverse(` ${req.method} `)} ${req.protocol}://${req.get(
      "host"
    )}${req.originalUrl} : ${format(new Date(), "dd-MMM-yyyy: p")}`
  );
  next();
};

export default logger;
