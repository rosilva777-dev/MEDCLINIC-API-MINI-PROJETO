import { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (
  error: unknown,
  _req,
  res,
  _next
): void => {
  console.error(error);

  if (error instanceof Error) {
    if (error.name === "ConflictError") {
      res.status(409).json({ message: error.message });
      return;
    }

    if (error.name === "UnauthorizedError") {
      res.status(401).json({ message: error.message });
      return;
    }

    if (error.name === "NotFoundError") {
      res.status(404).json({ message: error.message });
      return;
    }
  }

  res.status(500).json({ message: "Erro interno do servidor." });
};