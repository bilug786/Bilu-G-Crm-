import * as prismaService from "./prisma/leads";
import * as mockService from "./mock/leads";

const isDbConfigured = !!process.env.DATABASE_URL;

export const leadService = isDbConfigured ? prismaService : mockService;
