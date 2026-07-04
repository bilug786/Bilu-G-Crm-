# API Documentation

Ex-Employee v.01 primarily uses a direct-to-database approach with Prisma and Supabase.

## Authentication
All API routes are protected by Supabase Auth middleware.
- `POST /auth/login`: Authenticate users.
- `POST /auth/logout`: Terminate sessions.

## Core Entities
Data is managed via the Prisma Client.
- `prisma.lead`: CRUD operations for leads.
- `prisma.customer`: CRUD operations for customers.
- `prisma.booking`: CRUD operations for bookings.

## File Uploads
Handled via Supabase Storage buckets:
- `hotel-images`: For hotel and room photos.
- `customer-docs`: For KYC and travel documents.

Developed by Bilu G
