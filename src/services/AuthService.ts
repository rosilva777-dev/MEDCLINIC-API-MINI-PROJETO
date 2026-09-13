import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { comparePassword, hashPassword } from "../utils/password";
import { signToken } from "../utils/jwt";

export interface AuthResponse {
  token: string;
}

export class AuthService {
  private readonly userRepository: UserRepository;

  public constructor(userRepository: UserRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  public async register(
    name: string,
    email: string,
    password: string,
    role: User["role"]
  ): Promise<User> {
    const normalizedEmail = email.trim().toLowerCase();

    if (await this.userRepository.emailExists(normalizedEmail)) {
      const error = new Error("E-mail já cadastrado.");
      error.name = "ConflictError";
      throw error;
    }

    const passwordHash = await hashPassword(password);
    return this.userRepository.create(
      name.trim(),
      normalizedEmail,
      passwordHash,
      role
    );
  }

  public async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(email.trim().toLowerCase());

    if (!user || !(await comparePassword(password, user.password))) {
      const error = new Error("Credenciais inválidas.");
      error.name = "UnauthorizedError";
      throw error;
    }

    return {
      token: signToken({ id: user.id, role: user.role })
    };
  }
}