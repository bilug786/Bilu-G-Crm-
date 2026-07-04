'use server'

import prisma from "./prisma";
import { revalidatePath } from "next/cache";

export async function createBooking(data: any) {
  const total = Number(data.totalAmount);
  const paid = Number(data.paidAmount);
  const balance = total - paid;

  const booking = await prisma.booking.create({
    data: {
      customerId: data.customerId,
      packageId: data.packageId,
      totalAmount: total,
      paidAmount: paid,
      balanceAmount: balance,
      tourStartDate: new Date(data.tourStartDate),
      tourEndDate: new Date(data.tourEndDate),
      numPax: Number(data.numPax),
      status: 'CONFIRMED',
      paymentStatus: balance <= 0 ? 'PAID' : 'PARTIAL',
    }
  });

  revalidatePath('/dashboard/bookings');
  return booking;
}

export async function deleteBooking(id: string) {
  await prisma.booking.delete({ where: { id } });
  revalidatePath('/dashboard/bookings');
}
