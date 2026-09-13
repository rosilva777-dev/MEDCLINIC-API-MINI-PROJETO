import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { hashPassword } from "../utils/password";

export class UserService {
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

  public async findById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      const error = new Error("Usuário não encontrado.");
      error.name = "NotFoundError";
      throw error;
    }

    return user;
  }
}