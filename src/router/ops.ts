import { Router } from "express"

import opsController from "../controllers/ops.controller"

const opsRouter = Router()

opsRouter.get("/heapdump/", opsController.getHeapdump)

export default opsRouter
