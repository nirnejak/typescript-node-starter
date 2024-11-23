import {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from "fastify"

const userRoutes = async (fastify: FastifyInstance): Promise<void> => {
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

      return await reply.code(201).send(body)
    },
  })
}

export default userRoutes
