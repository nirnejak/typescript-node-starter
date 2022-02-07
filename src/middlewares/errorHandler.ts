import { ErrorRequestHandler } from "express"

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (!err) {
    next()
  }
  const statusCode = res.statusCode || 500

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  })
}

export default errorHandler
