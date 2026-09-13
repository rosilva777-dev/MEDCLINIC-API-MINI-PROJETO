import { Request, Response } from "express";
import { User } from "../entities/User";
import { AuthService } from "../services/AuthService";

interface RegisterBody {
  name?: string;
  email?: string;
  password?: string;
  role?: User["role"];
}

interface LoginBody {
  email?: string;
  password?: string;
}

export class AuthController {
  private readonly authService: AuthService;

  public constructor(authService: AuthService = new AuthService()) {
    this.authService = authService;
  }

  public register = async (
    req: Request<unknown, unknown, RegisterBody>,
    res: Response
  ): Promise<void> => {
    const { name, email, password, role = "USER" } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "name, email e password são obrigatórios." });
      return;
    }

    if (!this.isValidEmail(email)) {
      res.status(400).json({ message: "Formato de e-mail inválido." });
      return;
    }

    if (!["USER", "ADMIN"].includes(role)) {
      res.status(400).json({ message: "Perfil de acesso inválido." });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ message: "A senha deve possuir pelo menos 8 caracteres." });
      return;
    }

    const user = await this.authService.register(name, email, password, role);

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    });
  };

  public login = async (
    req: Request<unknown, unknown, LoginBody>,
    res: Response
  ): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "email e password são obrigatórios." });
      return;
    }

    const result = await this.authService.login(email, password);
    res.status(200).json(result);
  };

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}