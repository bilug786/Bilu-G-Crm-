# TRAVEL CRM DATABASE SETUP

-- Create sequence for invoice numbers
CREATE SEQUENCE IF NOT EXISTS invoice_seq START 1001;

-- Add triggers for automatic fields
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER set_user_updated_at BEFORE UPDATE ON "User" FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_customer_updated_at BEFORE UPDATE ON "Customer" FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_lead_updated_at BEFORE UPDATE ON "Lead" FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_package_updated_at BEFORE UPDATE ON "TourPackage" FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_booking_updated_at BEFORE UPDATE ON "Booking" FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- RLS Policies
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Customer" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lead" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TourPackage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Booking" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own data" ON "User" USING (auth.uid()::text = id);
CREATE POLICY "Authenticated users can read all CRM data" ON "Customer" FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff can manage leads" ON "Lead" TO authenticated USING (true);
