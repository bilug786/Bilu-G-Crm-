-- DATABASE SETUP FOR EX-EMPLOYEE V.01
-- This script sets up RLS policies, triggers, and functions in Supabase.

-- Enable Row Level Security
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Customer" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lead" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TourPackage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Booking" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Hotel" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Invoice" ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (Example: Authenticated users can read all)
CREATE POLICY "Allow authenticated read access" ON "User" FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON "Customer" FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON "Lead" FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON "TourPackage" FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON "Booking" FOR SELECT TO authenticated USING (true);

-- Trigger for Audit Logs
CREATE OR REPLACE FUNCTION log_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "ActivityLog" ("userId", "activity", "createdAt")
  VALUES (auth.uid()::text, TG_OP || ' on ' || TG_TABLE_NAME, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER lead_activity_trigger
AFTER INSERT OR UPDATE OR DELETE ON "Lead"
FOR EACH ROW EXECUTE FUNCTION log_activity();

-- Function for Invoice numbering
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW."invoiceNumber" := 'INV-' || TO_CHAR(now(), 'YYYYMMDD') || '-' || LPAD(nextval('invoice_seq')::text, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Views
CREATE VIEW "RevenueSummary" AS
SELECT
  DATE_TRUNC('month', "bookingDate") as month,
  SUM("totalAmount") as total_revenue
FROM "Booking"
WHERE "paymentStatus" = 'PAID'
GROUP BY 1;
