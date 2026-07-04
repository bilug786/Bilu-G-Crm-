import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ex-Employee v.01 | Bilu G",
  description: "Production-ready SaaS CRM for Travel Agencies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster position="top-center" richColors />
        <footer className="fixed bottom-4 right-6 text-xs text-slate-400 bg-white/50 backdrop-blur px-3 py-1 rounded-full border border-slate-100">
           Developed by Bilu G
        </footer>
      </body>
    </html>
  );
}
