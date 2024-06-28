export class CustomError extends Error {
  statusCode: number;
  inOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.inOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}
