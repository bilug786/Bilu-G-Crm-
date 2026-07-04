import { prisma } from "@/lib/prisma";

export const getLeads = async () => {
  if (!prisma) return null;
  try {
    return await prisma.lead.findMany({
      include: { customer: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Prisma error fetching leads:", error);
    return null;
  }
};
