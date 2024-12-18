import type { FastifyInstance } from "fastify"

function errorHandlerPlugin(fastify: FastifyInstance): void {
  fastify.setErrorHandler((error, request, reply) => {
    request.log.error(error)

    if (error.validation == null) {
      reply.status(400).send({
        error: "Validation Error",
        message: error.message,
      })
    } else {
      reply.status(500).send({
        error: "Internal Server Error",
        message: error.message,
      })
    }
  })
}

export default errorHandlerPlugin
