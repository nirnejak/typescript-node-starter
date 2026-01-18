import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import fastifyPlugin from "fastify-plugin"

import { allWaitlists, addToWaitlist } from "@/controllers/waitlist"

const waitlistRoutes = (fastify: FastifyInstance): void => {
  fastify.get("/", {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      return await reply.code(201).send(allWaitlists)
    },
  })
  fastify.post("/", {
    handler: async (
      request: FastifyRequest<{ Body: { email: string } }>,
      reply: FastifyReply
    ) => {
      const { body } = request
      const res = await addToWaitlist(body.email)
      return await reply.code(201).send(res)
    },
  })
}

export default fastifyPlugin(waitlistRoutes)
