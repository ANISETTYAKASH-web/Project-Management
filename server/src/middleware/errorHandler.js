export default function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const status = error.status || "fail";
  console.error("error", error.stack);
  res.status(statusCode).json({
    statusCode: statusCode,
    message: error.message,
    status: status,
    error: error.orginal?.message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),

    // stack: error.stack,
  });
}
