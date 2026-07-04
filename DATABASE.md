# Database Documentation

Ex-Employee v.01 uses PostgreSQL via Supabase, managed with Prisma ORM.

## Schema Overview

The database consists of 35+ tables organized into several modules:

### 1. User & Auth
- `User`: Staff and admin accounts.
- `Role`/`Permission`: RBAC system.

### 2. CRM
- `Customer`: Client database.
- `Lead`: Potential sales opportunities.
- `FollowUp`: Lead communication history.

### 3. Tour Operations
- `TourPackage`: Offered travel deals.
- `Destination`: Geographical locations.
- `Hotel`: Partner accommodation details.
- `Vehicle`/`Driver`: Transport fleet management.

### 4. Bookings & Financials
- `Booking`: Primary transaction record.
- `Payment`: Financial transaction logs.
- `Invoice`: GST-ready billing.
- `Expense`/`Income`: General ledger tracking.

### 5. Utility & Logging
- `AuditLog`: Record of system changes.
- `ActivityLog`: User action history.
- `Notification`: System alerts.

## SQL Features
- **Triggers**: Automatic audit logging and status updates.
- **RLS**: Row-level security for data isolation.
- **Indexes**: Optimized for search on email, registration numbers, and IDs.

Developed by Bilu G
