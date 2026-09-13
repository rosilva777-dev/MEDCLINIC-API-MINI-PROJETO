import { Response } from "express";
import { AuthRequest } from "../types/AuthRequest";

export class AdminController {
  public ping = (_req: AuthRequest, res: Response): void => {
    res.status(200).json({
      message: "RBAC funcionando.",
      profile: "ADMIN"
    });
  };
}