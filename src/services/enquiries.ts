import * as prismaService from "./prisma/enquiries";
import * as mockService from "./mock/enquiries";

const isDbConfigured = !!process.env.DATABASE_URL;

export const enquiryService = isDbConfigured ? prismaService : mockService;
