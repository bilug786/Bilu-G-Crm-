import { prisma } from "@/lib/prisma";

export const getEnquiries = async () => {
  if (!prisma) return null;
  try {
    return await prisma.enquiry.findMany({
      include: { customer: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Prisma error fetching enquiries:", error);
    return null;
  }
};
