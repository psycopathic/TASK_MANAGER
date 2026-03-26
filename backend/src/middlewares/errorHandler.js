import { responseHandler } from "../utils/responseHandler.js";

export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  console.error("Error:", {
    message,
    statusCode,
    stack: error.stack,
  });

  // Mongoose validation error
  if (error.name === "ValidationError") {
    const errors = Object.keys(error.errors).reduce((acc, key) => {
      acc[key] = error.errors[key].message;
      return acc;
    }, {});
    return res.status(400).json(
      responseHandler(false, 400, "Validation failed", null, errors)
    );
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(409).json(
      responseHandler(false, 409, `${field} already exists`)
    );
  }

  res.status(statusCode).json(
    responseHandler(false, statusCode, message)
  );
};
