import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Initialize Prisma only if DATABASE_URL is present
export const prisma =
  globalForPrisma.prisma ||
  (process.env.DATABASE_URL
    ? new PrismaClient({ log: ["query"] })
    : (null as unknown as PrismaClient));

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
