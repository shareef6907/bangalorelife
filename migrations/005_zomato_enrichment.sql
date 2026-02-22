-- Add Zomato enrichment columns to venues table
-- Run this in Supabase Dashboard > SQL Editor

-- New columns for Zomato data
ALTER TABLE venues ADD COLUMN IF NOT EXISTS zomato_rating NUMERIC;
ALTER TABLE venues ADD COLUMN IF NOT EXISTS price_for_two INTEGER;
ALTER TABLE venues ADD COLUMN IF NOT EXISTS popular_dishes TEXT[];
ALTER TABLE venues ADD COLUMN IF NOT EXISTS zomato_url TEXT;

-- Create indexes for faster filtering
CREATE INDEX IF NOT EXISTS idx_venues_cuisine_types ON venues USING GIN (cuisine_types);
CREATE INDEX IF NOT EXISTS idx_venues_features ON venues USING GIN (features);
CREATE INDEX IF NOT EXISTS idx_venues_zomato_rating ON venues (zomato_rating DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_venues_type_neighborhood ON venues (type, neighborhood);

-- Update existing empty arrays to null for cleaner queries
UPDATE venues SET cuisine_types = NULL WHERE cuisine_types = '{}';
UPDATE venues SET features = NULL WHERE features = '{}';

-- Add comments
COMMENT ON COLUMN venues.zomato_rating IS 'Rating from Zomato (0-5 scale)';
COMMENT ON COLUMN venues.price_for_two IS 'Average price for two in INR from Zomato';
COMMENT ON COLUMN venues.popular_dishes IS 'Popular dishes mentioned on Zomato';
COMMENT ON COLUMN venues.zomato_url IS 'Link to Zomato page';
