# Deployment Guide

Ex-Employee v.01 is optimized for Vercel.

## Vercel Deployment

1.  Connect your GitHub repository to Vercel.
2.  Add all environment variables from `.env.example`.
3.  Configure the build settings:
    - Build Command: `npx prisma generate && next build`
    - Output Directory: `.next`
4.  Deploy.

## Supabase Setup

1.  Create a new project in Supabase.
2.  Run the SQL schema provided in `DATABASE.md` or use Prisma migrations.
3.  Enable Auth providers (Email/Password).
4.  Configure Storage buckets for `gallery`, `documents`, and `company-branding`.

Developed by Bilu G
