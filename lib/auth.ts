import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../app/types";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS!);
const JWT_SECRET = process.env.JWT_SECRET!;

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string): { userId: string } => {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    if (!token) return null;

    const decode = verifyToken(token);

    const userFromDb = await prisma.user.findUnique({
      where: { id: decode.userId },
      omit: {
        password: true,
      },
    });

    if (!userFromDb) return null;

    return userFromDb as User;
  } catch (error) {
    console.error(error);
    return null;
  }
};
