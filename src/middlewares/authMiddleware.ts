import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import { verifyToken } from "../utils/jwt";

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token de autenticação não informado." });
    return;
  }

  const token = authorization.substring("Bearer ".length).trim();

  try {
    req.authUser = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
}