import type {
  FastifyInstance,
  FastifyError,
  FastifyPluginOptions,
} from "fastify"
import fastifyPlugin from "fastify-plugin"

function errorHandlerPlugin(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done
): void {
  fastify.setErrorHandler((error: FastifyError, request, reply) => {
    request.log.error(error)

    if (error.validation === undefined) {
      reply.status(500).send({
        error: "Internal Server Error",
        message: error.message,
      })
    } else {
      reply.status(400).send({
        error: "Validation Error",
        message: error.message,
      })
    }
  })

  done()
}

export default fastifyPlugin(errorHandlerPlugin)
