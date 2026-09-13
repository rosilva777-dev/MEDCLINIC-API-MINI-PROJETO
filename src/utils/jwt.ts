import jwt from "jsonwebtoken";
import { UserRole } from "../entities/User";

interface TokenPayload {
  id: number;
  role: UserRole;
}

const jwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET não configurado.");
  }

  return secret;
};

export function signToken(payload: TokenPayload): string {
  const expiresIn = process.env.JWT_EXPIRES_IN ?? "1h";

  return jwt.sign(payload, jwtSecret(), {
    expiresIn: expiresIn as jwt.SignOptions["expiresIn"]
  });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, jwtSecret()) as TokenPayload;
}