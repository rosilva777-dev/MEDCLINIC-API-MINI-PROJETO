import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import { UserRole } from "../entities/User";

export function requireRole(...allowedRoles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const role = req.authUser?.role;

    if (!role || !allowedRoles.includes(role)) {
      res.status(403).json({ message: "Acesso negado para este perfil." });
      return;
    }

    next();
  };
}