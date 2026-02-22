/**
 * Run database migrations via Supabase
 * 
 * Since direct DDL isn't available via client, this outputs the SQL to run manually
 * OR you can use this with the Supabase CLI: supabase db push
 */

import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MIGRATION_SQL = `
-- Zomato Enrichment Migration
-- Run this in Supabase Dashboard > SQL Editor

-- Add new columns for Zomato data
ALTER TABLE venues ADD COLUMN IF NOT EXISTS zomato_rating NUMERIC;
ALTER TABLE venues ADD COLUMN IF NOT EXISTS price_for_two INTEGER;
ALTER TABLE venues ADD COLUMN IF NOT EXISTS popular_dishes TEXT[];
ALTER TABLE venues ADD COLUMN IF NOT EXISTS zomato_url TEXT;

-- Create indexes for faster filtering
CREATE INDEX IF NOT EXISTS idx_venues_cuisine_types ON venues USING GIN (cuisine_types);
CREATE INDEX IF NOT EXISTS idx_venues_features ON venues USING GIN (features);
CREATE INDEX IF NOT EXISTS idx_venues_zomato_rating ON venues (zomato_rating DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_venues_type_neighborhood ON venues (type, neighborhood);

-- Clean up empty arrays
UPDATE venues SET cuisine_types = NULL WHERE cuisine_types = '{}';
UPDATE venues SET features = NULL WHERE features = '{}';

-- Verify
SELECT COUNT(*) as total_venues,
       COUNT(zomato_rating) as with_rating,
       COUNT(cuisine_types) as with_cuisine
FROM venues;
`;

console.log('='.repeat(60));
console.log('SUPABASE MIGRATION - Copy and run in SQL Editor');
console.log('='.repeat(60));
console.log('');
console.log('1. Go to: https://supabase.com/dashboard/project/imvanyylhitwmuegepkr/sql');
console.log('2. Paste the following SQL and click "Run"');
console.log('');
console.log('-'.repeat(60));
console.log(MIGRATION_SQL);
console.log('-'.repeat(60));
