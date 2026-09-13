import { Request } from "express";
import { UserRole } from "../entities/User";

export interface AuthenticatedUser {
  id: number;
  role: UserRole;
}

export interface AuthRequest extends Request {
  authUser?: AuthenticatedUser;
}