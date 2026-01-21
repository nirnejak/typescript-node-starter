import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify"
import fastifyPlugin from "fastify-plugin"

const userRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
): void => {
  fastify.get("/api/user/", {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const users = [
        { name: "Alice", age: 30 },
        { name: "Bob", age: 25 },
      ]
      return await reply.code(200).send(users)
    },
  })
  fastify.post("/api/user/", {
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

  done()
}

export default fastifyPlugin(userRoutes)
