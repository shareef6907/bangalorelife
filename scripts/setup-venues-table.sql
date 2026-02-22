-- BangaloreLife.com - Venues Table (Google Maps backed)
-- Run this in Supabase SQL Editor

-- Drop existing venues table if exists (backup first!)
-- DROP TABLE IF EXISTS venues;

CREATE TABLE IF NOT EXISTS venues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  
  -- Google Places Data
  google_place_id TEXT UNIQUE,
  google_rating DECIMAL(2,1),
  google_reviews_count INTEGER DEFAULT 0,
  google_price_level INTEGER CHECK (google_price_level BETWEEN 1 AND 4),
  
  -- Classification
  type TEXT NOT NULL CHECK (type IN ('pub', 'bar', 'brewery', 'club', 'lounge', 'rooftop', 'cafe', 'restaurant')),
  neighborhood TEXT NOT NULL,
  
  -- Location
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Contact
  phone TEXT,
  website TEXT,
  google_maps_url TEXT,
  
  -- Hours & Status
  opening_hours JSONB DEFAULT '[]'::jsonb,
  
  -- Media
  photos JSONB DEFAULT '[]'::jsonb,
  cover_photo_url TEXT,
  
  -- Editorial Content (our original write-ups)
  editorial_content TEXT,
  best_for_tags TEXT[] DEFAULT '{}',
  
  -- Affiliate
  bookmyshow_url TEXT,
  has_events BOOLEAN DEFAULT false,
  
  -- Metadata
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  last_google_sync TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_venues_neighborhood ON venues(neighborhood);
CREATE INDEX IF NOT EXISTS idx_venues_type ON venues(type);
CREATE INDEX IF NOT EXISTS idx_venues_rating ON venues(google_rating DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_venues_reviews ON venues(google_reviews_count DESC);
CREATE INDEX IF NOT EXISTS idx_venues_featured ON venues(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_venues_active ON venues(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_venues_slug ON venues(slug);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_venues_search ON venues USING GIN (to_tsvector('english', name || ' ' || COALESCE(neighborhood, '') || ' ' || COALESCE(editorial_content, '')));

-- Updated_at trigger
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

-- Enable RLS
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public venues are viewable by everyone"
  ON venues FOR SELECT
  USING (is_active = true);

-- Service role full access
CREATE POLICY "Service role has full access"
  ON venues FOR ALL
  USING (true)
  WITH CHECK (true);

-- Grant permissions
GRANT SELECT ON venues TO anon;
GRANT SELECT ON venues TO authenticated;
GRANT ALL ON venues TO service_role;

-- Neighborhoods reference
COMMENT ON TABLE venues IS 'Bangalore venues with Google Places data';
COMMENT ON COLUMN venues.neighborhood IS 'koramangala, indiranagar, mg-road, whitefield, hsr-layout, jp-nagar, jayanagar, hennur, sarjapur, yelahanka, hebbal, church-street, brigade-road, etc.';
COMMENT ON COLUMN venues.type IS 'pub, bar, brewery, club, lounge, rooftop, cafe, restaurant';
