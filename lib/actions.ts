import prisma from "@/lib/prisma";

export async function getLeads() {
  return await prisma.lead.findMany({
    include: {
      customer: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getCustomers() {
  return await prisma.customer.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}
