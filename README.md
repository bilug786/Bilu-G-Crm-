# Travel CRM SaaS

A complete production-ready Travel CRM SaaS built with Next.js 15, React, TypeScript, Tailwind CSS, Supabase, Prisma, and shadcn/ui.

## Features

- **Dashboard**: Modern analytics with Recharts.
- **Lead Management**: Track and manage potential customers.
- **Customer CRM**: Comprehensive customer database.
- **Enquiry Management**: Manage customer trip enquiries.
- **Quotation Builder**: Create professional quotes with a dynamic itinerary editor.
- **Booking Management**: Track confirmed bookings and payments.
- **Voucher & Invoice**: Generate professional PDFs for vouchers and GST invoices.
- **Supplier & Expense**: Track supplier details and booking-related expenses.
- **Dark/Light Mode**: Fully responsive design with theme support.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Auth**: Supabase Auth
- **PDF**: jsPDF
- **Charts**: Recharts

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd Bilu-G-Crm-
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Supabase (Optional for first run)

The application is designed to run with mock data if Supabase is not yet configured. To connect your own Supabase project:

1. Create a project at [supabase.com](https://supabase.com).
2. Copy your Project URL and Anon Key.
3. Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=your-postgresql-connection-string
```

### 4. Setup Prisma

Once your `DATABASE_URL` is configured in `.env`:

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Vercel

This project is ready to be deployed on Vercel.

- It will build successfully even without Supabase environment variables.
- Authentication will be bypassed if environment variables are missing.
- To enable full functionality after deployment, add the Supabase and Prisma environment variables in the Vercel project settings and re-deploy.

## License

MIT
