import { PrismaClient } from "@prisma/client";

// Create a single instance of PrismaClient to avoid exhausting database connections
const globalForPrisma = globalThis as any;

export const prisma: PrismaClient =
  globalForPrisma.prisma || new PrismaClient({ log: ["query", "error"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
