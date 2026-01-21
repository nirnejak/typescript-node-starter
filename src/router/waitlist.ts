import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify"

import { allWaitlists, addToWaitlist } from "@/controllers/waitlist"

const waitlistRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
): void => {
  fastify.get("/api/waitlist/", {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      return await reply.code(200).send(allWaitlists)
    },
  })
  fastify.post("/api/waitlist/", {
    handler: async (
      request: FastifyRequest<{ Body: { email: string } }>,
      reply: FastifyReply
    ) => {
      const { body } = request
      const res = await addToWaitlist(body.email)
      return await reply.code(201).send(res)
    },
  })

  done()
}

export default waitlistRoutes
