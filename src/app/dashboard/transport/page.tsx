"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function TransportPage() {
  useEffect(() => {
    redirect("/dashboard/suppliers");
  }, []);
  return null;
}
