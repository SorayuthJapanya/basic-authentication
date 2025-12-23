import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };

export async function checkingDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1 + 1;`;
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
}
