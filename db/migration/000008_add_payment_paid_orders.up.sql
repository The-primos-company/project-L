ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS payment_paid MONEY NOT NULL DEFAULT '0';
