'use server'

import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { LeadStatus, BookingStatus, PaymentStatus } from "@prisma/client";

// LEADS
export async function getLeads(search?: string) {
  return await prisma.lead.findMany({
    where: search ? {
      OR: [
        { customer: { name: { contains: search, mode: 'insensitive' } } },
        { customer: { email: { contains: search, mode: 'insensitive' } } },
      ]
    } : {},
    include: { customer: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createLead(data: any) {
  const lead = await prisma.lead.create({ data });
  revalidatePath('/dashboard/leads');
  return lead;
}

export async function updateLead(id: string, data: any) {
  const lead = await prisma.lead.update({ where: { id }, data });
  revalidatePath('/dashboard/leads');
  return lead;
}

export async function deleteLead(id: string) {
  await prisma.lead.delete({ where: { id } });
  revalidatePath('/dashboard/leads');
}

// CUSTOMERS
export async function getCustomers(search?: string) {
  return await prisma.customer.findMany({
    where: search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ]
    } : {},
    orderBy: { name: 'asc' },
  });
}

export async function createCustomer(data: any) {
  const customer = await prisma.customer.create({ data });
  revalidatePath('/dashboard/customers');
  return customer;
}

export async function updateCustomer(id: string, data: any) {
  const customer = await prisma.customer.update({ where: { id }, data });
  revalidatePath('/dashboard/customers');
  return customer;
}

export async function deleteCustomer(id: string) {
  await prisma.customer.delete({ where: { id } });
  revalidatePath('/dashboard/customers');
}

// HOTELS
export async function getHotels(search?: string) {
  return await prisma.hotel.findMany({
    where: search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
      ]
    } : {},
    include: { category: true },
    orderBy: { name: 'asc' },
  });
}

export async function createHotel(data: any) {
  const hotel = await prisma.hotel.create({ data });
  revalidatePath('/dashboard/hotels');
  return hotel;
}

// TRANSPORT
export async function getVehicles(search?: string) {
  return await prisma.vehicle.findMany({
    where: search ? {
      OR: [
        { model: { contains: search, mode: 'insensitive' } },
        { registration: { contains: search, mode: 'insensitive' } },
        { driverName: { contains: search, mode: 'insensitive' } },
      ]
    } : {},
    orderBy: { model: 'asc' },
  });
}

// PACKAGES
export async function getPackages(search?: string) {
  return await prisma.tourPackage.findMany({
    where: search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
      ]
    } : {},
    include: { category: true, destination: true },
    orderBy: { createdAt: 'desc' },
  });
}

// BOOKINGS
export async function getBookings() {
  return await prisma.booking.findMany({
    include: { customer: true, package: true },
    orderBy: { createdAt: 'desc' },
  });
}

// DASHBOARD STATS
export async function getDashboardStats() {
  const [leadsCount, customersCount, bookingsCount, totalRevenue] = await Promise.all([
    prisma.lead.count(),
    prisma.customer.count(),
    prisma.booking.count(),
    prisma.booking.aggregate({
      _sum: { paidAmount: true }
    })
  ]);

  return {
    leads: leadsCount,
    customers: customersCount,
    bookings: bookingsCount,
    revenue: totalRevenue._sum.paidAmount?.toNumber() || 0
  };
}

// SETTINGS
export async function getCompanySettings() {
  return await prisma.companySetting.findUnique({
    where: { id: "1" }
  });
}

export async function updateCompanySettings(data: any) {
  const settings = await prisma.companySetting.upsert({
    where: { id: "1" },
    update: data,
    create: { id: "1", ...data }
  });
  revalidatePath('/dashboard/settings');
  return settings;
}
