import { Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import { UserService } from "../services/UserService";

export class UserController {
  private readonly userService: UserService;

  public constructor(userService: UserService = new UserService()) {
    this.userService = userService;
  }

  public me = async (req: AuthRequest, res: Response): Promise<void> => {
    const user = await this.userService.findById(req.authUser!.id);

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    });
  };
}