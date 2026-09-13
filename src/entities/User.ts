import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

export type UserRole = "USER" | "ADMIN";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 120 })
  name!: string;

  @Column({ length: 255, unique: true })
  email!: string;

  @Column({ length: 255, select: false })
  password!: string;

  @Column({ type: "varchar", length: 20, default: "USER" })
  role!: UserRole;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}