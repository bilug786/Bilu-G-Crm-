import * as prismaService from "./prisma/customers";
import * as mockService from "./mock/customers";

const isDbConfigured = !!process.env.DATABASE_URL;

export const customerService = isDbConfigured ? prismaService : mockService;
