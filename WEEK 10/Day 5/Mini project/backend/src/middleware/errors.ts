import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error("Unhandled request error", error);
  if (error instanceof SyntaxError && "status" in error && error.status === 400) {
    res.status(400).json({ message: "Request body must contain valid JSON." });
    return;
  }
  res.status(500).json({ message: "Something went wrong. Please try again." });
};
