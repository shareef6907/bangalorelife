-- BangaloreLife.com - Malls Table
-- For Shopping Malls and their store directories

CREATE TABLE IF NOT EXISTS malls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  
  -- Google Places Data
  google_place_id TEXT UNIQUE,
  google_rating DECIMAL(2,1),
  google_reviews_count INTEGER DEFAULT 0,
  
  -- Classification
  mall_type TEXT DEFAULT 'shopping-mall' CHECK (mall_type IN ('shopping-mall', 'lifestyle-center', 'outlet-mall', 'hypermarket')),
  neighborhood TEXT NOT NULL,
  
  -- Location
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Contact
  phone TEXT,
  website TEXT,
  google_maps_url TEXT,
  
  -- Hours
  opening_hours JSONB DEFAULT '[]'::jsonb,
  
  -- Media
  photos JSONB DEFAULT '[]'::jsonb,
  cover_photo_url TEXT,
  
  -- Mall-specific Info
  floors INTEGER,
  total_stores INTEGER,
  anchor_stores TEXT[] DEFAULT '{}',
  parking_info TEXT,
  
  -- Content
  description TEXT,
  highlights TEXT[] DEFAULT '{}',
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Metadata
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  last_google_sync TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mall Stores (stores inside malls)
CREATE TABLE IF NOT EXISTS mall_stores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mall_id UUID REFERENCES malls(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  
  -- Google Places Data
  google_place_id TEXT,
  google_rating DECIMAL(2,1),
  
  -- Classification
  category TEXT NOT NULL CHECK (category IN (
    'fashion', 'electronics', 'food-dining', 'entertainment', 
    'beauty', 'sports', 'kids', 'home-lifestyle', 'jewelry', 
    'supermarket', 'services', 'other'
  )),
  
  -- Location in mall
  floor TEXT,
  unit_number TEXT,
  
  -- Contact
  phone TEXT,
  website TEXT,
  
  -- Brand info
  is_anchor_store BOOLEAN DEFAULT false,
  brand_logo_url TEXT,
  
  -- Metadata
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(mall_id, slug)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_malls_neighborhood ON malls(neighborhood);
CREATE INDEX IF NOT EXISTS idx_malls_rating ON malls(google_rating DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_malls_slug ON malls(slug);
CREATE INDEX IF NOT EXISTS idx_malls_active ON malls(is_active) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_mall_stores_mall ON mall_stores(mall_id);
CREATE INDEX IF NOT EXISTS idx_mall_stores_category ON mall_stores(category);
CREATE INDEX IF NOT EXISTS idx_mall_stores_anchor ON mall_stores(is_anchor_store) WHERE is_anchor_store = true;

-- Full-text search
CREATE INDEX IF NOT EXISTS idx_malls_search ON malls USING GIN (to_tsvector('english', name || ' ' || COALESCE(neighborhood, '') || ' ' || COALESCE(description, '')));
CREATE INDEX IF NOT EXISTS idx_mall_stores_search ON mall_stores USING GIN (to_tsvector('english', name || ' ' || COALESCE(category, '')));

-- Updated_at trigger
DROP TRIGGER IF EXISTS malls_updated_at ON malls;
CREATE TRIGGER malls_updated_at
  BEFORE UPDATE ON malls
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE malls ENABLE ROW LEVEL SECURITY;
ALTER TABLE mall_stores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public malls viewable" ON malls FOR SELECT USING (is_active = true);
CREATE POLICY "Service role malls" ON malls FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public stores viewable" ON mall_stores FOR SELECT USING (is_active = true);
CREATE POLICY "Service role stores" ON mall_stores FOR ALL USING (true) WITH CHECK (true);

-- Permissions
GRANT SELECT ON malls TO anon, authenticated;
GRANT SELECT ON mall_stores TO anon, authenticated;
GRANT ALL ON malls TO service_role;
GRANT ALL ON mall_stores TO service_role;

COMMENT ON TABLE malls IS 'Bangalore shopping malls with Google Places data';
COMMENT ON TABLE mall_stores IS 'Individual stores inside malls';
