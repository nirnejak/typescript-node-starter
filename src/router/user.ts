import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

const userRoutes = async (fastify: FastifyInstance) => {
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
      const body = request.body

      return reply.code(201).send(body)
    },
  })
}

export default userRoutes
