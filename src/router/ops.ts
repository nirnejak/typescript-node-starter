import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import fs, { PathOrFileDescriptor } from "fs"
import heapdump from "heapdump"

export const opsRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/", {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      return heapdump.writeSnapshot(async (err, filename) => {
        if (err) {
          throw err
        }

        return fs.readFile(
          filename as PathOrFileDescriptor,
          "utf-8",
          (err, data: any) => {
            if (err) {
              throw err
            }

            return reply.send(data)
          }
        )
      })
    },
  })
}

export default opsRoutes
