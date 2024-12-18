import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

const userRoutes = (fastify: FastifyInstance): void => {
  fastify.post("/", {
    handler: async (
      request: FastifyRequest<{
        Body: {
          name: string
          age: number
        }
      }>,
      reply: FastifyReply
    ) => {
      const { body } = request

      return await reply.code(201).send(body)
    },
  })
}

export default userRoutes
