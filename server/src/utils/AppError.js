export default class AppError extends Error {
  constructor(message, statusCode, orginal = null) {
    super(message); //error.message
    this.statusCode = statusCode; //error.status
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.orginal = orginal;
    Error.captureStackTrace(this, this.constructor);
  }
}
