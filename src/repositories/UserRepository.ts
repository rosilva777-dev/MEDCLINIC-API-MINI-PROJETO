import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";

export class UserRepository {
  private readonly repository: Repository<User>;

  public constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  public async create(
    name: string,
    email: string,
    password: string,
    role: User["role"]
  ): Promise<User> {
    const user = this.repository.create({ name, email, password, role });
    return this.repository.save(user);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.repository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email = :email", { email })
      .getOne();
  }

  public async findById(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  public async emailExists(email: string): Promise<boolean> {
    const count = await this.repository.count({ where: { email } });
    return count > 0;
  }
}