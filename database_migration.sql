-- Run this in your Supabase SQL Editor
ALTER TABLE waitlist 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS whatsapp TEXT,
ADD COLUMN IF NOT EXISTS other_business_type TEXT;
