ALTER TABLE "prices" ADD COLUMN IF NOT EXISTS cost_washing varchar NOT NULL DEFAULT '0';
ALTER TABLE "prices" ADD COLUMN IF NOT EXISTS cost_ironing varchar NOT NULL DEFAULT '0';
ALTER TABLE "prices" ADD COLUMN IF NOT EXISTS cost_dyeing varchar NOT NULL DEFAULT '0';