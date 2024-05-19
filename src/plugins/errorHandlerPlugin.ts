import { FastifyInstance } from "fastify"

async function errorHandlerPlugin(fastify: FastifyInstance) {
  fastify.setErrorHandler((error, request, reply) => {
    request.log.error(error)

    if (error.validation) {
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
