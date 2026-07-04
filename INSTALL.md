# Installation Guide

Follow these steps to set up Ex-Employee v.01 locally.

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase Account

## Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd Bilu-G-Crm-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file based on `.env.example`.

4. **Initialize Database**
   ```bash
   npx prisma generate
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Build for Production**
   ```bash
   npm run build
   ```

Developed by Bilu G
