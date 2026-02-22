-- BangaloreLife.com - Complete Venues Table Fix
-- Run this in Supabase SQL Editor
-- Adds ALL missing columns from the blueprint

-- ============================================
-- 1. REMOVE RESTRICTIVE CHECK CONSTRAINT
-- ============================================
ALTER TABLE venues DROP CONSTRAINT IF EXISTS venues_type_check;

-- ============================================
-- 2. ADD ALL MISSING COLUMNS
-- ============================================

-- Location columns
ALTER TABLE venues ADD COLUMN IF NOT EXISTS latitude DECIMAL(10,7);
ALTER TABLE venues ADD COLUMN IF NOT EXISTS longitude DECIMAL(10,7);

-- Contact columns  
ALTER TABLE venues ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE venues ADD COLUMN IF NOT EXISTS phone_alt VARCHAR(20);
ALTER TABLE venues ADD COLUMN IF NOT EXISTS email VARCHAR(200);

-- Google Places columns
ALTER TABLE venues ADD COLUMN IF NOT EXISTS google_place_id VARCHAR(200);
ALTER TABLE venues ADD COLUMN IF NOT EXISTS google_maps_url VARCHAR(500);
ALTER TABLE venues ADD COLUMN IF NOT EXISTS google_rating DECIMAL(2,1);
ALTER TABLE venues ADD COLUMN IF NOT EXISTS google_reviews_count INTEGER DEFAULT 0;
ALTER TABLE venues ADD COLUMN IF NOT EXISTS google_price_level INTEGER;

-- External URLs
ALTER TABLE venues ADD COLUMN IF NOT EXISTS website VARCHAR(500);
ALTER TABLE venues ADD COLUMN IF NOT EXISTS zomato_url VARCHAR(500);
ALTER TABLE venues ADD COLUMN IF NOT EXISTS swiggy_url VARCHAR(500);
ALTER TABLE venues ADD COLUMN IF NOT EXISTS booking_url VARCHAR(500);
ALTER TABLE venues ADD COLUMN IF NOT EXISTS instagram_url VARCHAR(500);

-- Ratings & Pricing
ALTER TABLE venues ADD COLUMN IF NOT EXISTS rating DECIMAL(2,1);
ALTER TABLE venues ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT 0;
ALTER TABLE venues ADD COLUMN IF NOT EXISTS price_range INTEGER;

-- Arrays for cuisine and features
ALTER TABLE venues ADD COLUMN IF NOT EXISTS cuisine_types TEXT[] DEFAULT '{}';
ALTER TABLE venues ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}';

-- Hours and status
ALTER TABLE venues ADD COLUMN IF NOT EXISTS opening_hours JSONB DEFAULT '[]'::jsonb;
ALTER TABLE venues ADD COLUMN IF NOT EXISTS is_open_now BOOLEAN;

-- Flags
ALTER TABLE venues ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE venues ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;
ALTER TABLE venues ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Images
ALTER TABLE venues ADD COLUMN IF NOT EXISTS cover_photo_url TEXT;
ALTER TABLE venues ADD COLUMN IF NOT EXISTS photos JSONB DEFAULT '[]'::jsonb;

-- Source tracking for scrapers
ALTER TABLE venues ADD COLUMN IF NOT EXISTS source VARCHAR(50);
ALTER TABLE venues ADD COLUMN IF NOT EXISTS source_id VARCHAR(200);
ALTER TABLE venues ADD COLUMN IF NOT EXISTS last_scraped_at TIMESTAMPTZ;

-- SEO
ALTER TABLE venues ADD COLUMN IF NOT EXISTS meta_title VARCHAR(200);
ALTER TABLE venues ADD COLUMN IF NOT EXISTS meta_description VARCHAR(500);

-- Editorial
ALTER TABLE venues ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE venues ADD COLUMN IF NOT EXISTS description_raw TEXT;
ALTER TABLE venues ADD COLUMN IF NOT EXISTS editorial_content TEXT;
ALTER TABLE venues ADD COLUMN IF NOT EXISTS best_for_tags TEXT[] DEFAULT '{}';

-- Relations
ALTER TABLE venues ADD COLUMN IF NOT EXISTS area_id UUID REFERENCES areas(id);
ALTER TABLE venues ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id);

-- Timestamps
ALTER TABLE venues ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE venues ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Type and neighborhood (ensure they exist)
ALTER TABLE venues ADD COLUMN IF NOT EXISTS type TEXT;
ALTER TABLE venues ADD COLUMN IF NOT EXISTS neighborhood TEXT;

-- ============================================
-- 3. CREATE INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_venues_neighborhood ON venues(neighborhood);
CREATE INDEX IF NOT EXISTS idx_venues_type ON venues(type);
CREATE INDEX IF NOT EXISTS idx_venues_rating ON venues(rating DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_venues_google_rating ON venues(google_rating DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_venues_source_id ON venues(source_id);
CREATE INDEX IF NOT EXISTS idx_venues_google_place_id ON venues(google_place_id);
CREATE INDEX IF NOT EXISTS idx_venues_area ON venues(area_id);
CREATE INDEX IF NOT EXISTS idx_venues_category ON venues(category_id);
CREATE INDEX IF NOT EXISTS idx_venues_active ON venues(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_venues_featured ON venues(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_venues_cuisine ON venues USING GIN(cuisine_types);
CREATE INDEX IF NOT EXISTS idx_venues_features ON venues USING GIN(features);

-- Full-text search
CREATE INDEX IF NOT EXISTS idx_venues_search ON venues USING GIN(
  to_tsvector('english', COALESCE(name, '') || ' ' || COALESCE(neighborhood, '') || ' ' || COALESCE(description, ''))
);

-- ============================================
-- 4. UPDATE TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS venues_updated_at ON venues;
CREATE TRIGGER venues_updated_at
  BEFORE UPDATE ON venues
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================
-- 5. ROW LEVEL SECURITY
-- ============================================
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public venues viewable" ON venues;
CREATE POLICY "Public venues viewable" ON venues
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Service role full access venues" ON venues;
CREATE POLICY "Service role full access venues" ON venues
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 6. FORCE POSTGREST SCHEMA RELOAD
-- ============================================
NOTIFY pgrst, 'reload schema';

-- ============================================
-- 7. VERIFY COLUMNS
-- ============================================
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'venues' 
ORDER BY ordinal_position;
