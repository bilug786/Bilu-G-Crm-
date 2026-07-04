import { prisma } from "@/lib/prisma";

export const getCustomers = async () => {
  if (!prisma) return null;
  try {
    return await prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Prisma error fetching customers:", error);
    return null;
  }
};
