require("dotenv").config();
import express, { Application, Request, Response } from "express";

import logger from "./middlewares/logger";

const app: Application = express();

app.use(logger);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Typescript!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});