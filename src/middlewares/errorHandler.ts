import { ErrorRequestHandler } from "express"

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  const statusCode = res.statusCode || 500

  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  })
}

export default errorHandler
