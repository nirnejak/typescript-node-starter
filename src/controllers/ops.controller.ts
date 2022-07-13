import fs, { PathOrFileDescriptor } from "fs"
import { Request, Response } from "express"
import heapdump from "heapdump"

/**
 * @route GET /api/ops/heapdump
 * @access Public
 * @param req Request Object
 * @param res Response Object
 * @description Get a Heapdump of the current process
 */
const getHeapdump = (req: Request, res: Response) => {
  heapdump.writeSnapshot((err, filename) => {
    if (err) {
      throw err
    }

    fs.readFile(filename as PathOrFileDescriptor, "utf-8", (err, data: any) => {
      if (err) {
        throw err
      }

      res.end(data)
    })
  })
}

export default {
  getHeapdump,
}
