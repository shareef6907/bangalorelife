-- BangaloreLife.com - Enhanced Schema Migration
-- Run this in Supabase SQL Editor
-- This adds all missing tables and columns from the blueprint

-- ============================================
-- ENABLE POSTGIS EXTENSION (for location queries)
-- ============================================
CREATE EXTENSION IF NOT EXISTS postgis;

-- ============================================
-- AREAS TABLE (50+ Bangalore neighborhoods)
-- ============================================
CREATE TABLE IF NOT EXISTS areas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL UNIQUE,
  slug VARCHAR(200) NOT NULL UNIQUE,
  description TEXT,
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  location GEOGRAPHY(Point, 4326),
  parent_area_id UUID REFERENCES areas(id),
  population_estimate INTEGER,
  avg_rent_1bhk INTEGER,
  vibe_tags TEXT[] DEFAULT '{}',
  meta_title VARCHAR(200),
  meta_description VARCHAR(500),
  cover_image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_areas_slug ON areas(slug);
CREATE INDEX IF NOT EXISTS idx_areas_location ON areas USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_areas_active ON areas(is_active) WHERE is_active = true;

-- ============================================
-- CATEGORIES TABLE (full hierarchy)
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  parent_id UUID REFERENCES categories(id),
  icon VARCHAR(100),
  color VARCHAR(7),
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_order ON categories(display_order);

-- ============================================
-- ENHANCE EXISTING VENUES TABLE
-- ============================================
-- Add missing columns (safe - won't fail if they exist)
DO $$ 
BEGIN
  -- Add area_id foreign key
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='area_id') THEN
    ALTER TABLE venues ADD COLUMN area_id UUID REFERENCES areas(id);
  END IF;
  
  -- Add category_id foreign key
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='category_id') THEN
    ALTER TABLE venues ADD COLUMN category_id UUID REFERENCES categories(id);
  END IF;
  
  -- Add description fields
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='description') THEN
    ALTER TABLE venues ADD COLUMN description TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='description_raw') THEN
    ALTER TABLE venues ADD COLUMN description_raw TEXT;
  END IF;
  
  -- Add PostGIS location
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='location') THEN
    ALTER TABLE venues ADD COLUMN location GEOGRAPHY(Point, 4326);
  END IF;
  
  -- Add contact fields
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='phone_alt') THEN
    ALTER TABLE venues ADD COLUMN phone_alt VARCHAR(20);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='email') THEN
    ALTER TABLE venues ADD COLUMN email VARCHAR(200);
  END IF;
  
  -- Add external URLs
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='zomato_url') THEN
    ALTER TABLE venues ADD COLUMN zomato_url VARCHAR(500);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='swiggy_url') THEN
    ALTER TABLE venues ADD COLUMN swiggy_url VARCHAR(500);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='instagram_url') THEN
    ALTER TABLE venues ADD COLUMN instagram_url VARCHAR(500);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='booking_url') THEN
    ALTER TABLE venues ADD COLUMN booking_url VARCHAR(500);
  END IF;
  
  -- Add unified rating (to complement google_rating)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='rating') THEN
    ALTER TABLE venues ADD COLUMN rating DECIMAL(2,1);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='rating_count') THEN
    ALTER TABLE venues ADD COLUMN rating_count INTEGER DEFAULT 0;
  END IF;
  
  -- Add price_range (1-4 scale)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='price_range') THEN
    ALTER TABLE venues ADD COLUMN price_range INTEGER CHECK (price_range BETWEEN 1 AND 4);
  END IF;
  
  -- Add cuisine types
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='cuisine_types') THEN
    ALTER TABLE venues ADD COLUMN cuisine_types TEXT[] DEFAULT '{}';
  END IF;
  
  -- Add features
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='features') THEN
    ALTER TABLE venues ADD COLUMN features TEXT[] DEFAULT '{}';
  END IF;
  
  -- Add status fields
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='is_open_now') THEN
    ALTER TABLE venues ADD COLUMN is_open_now BOOLEAN;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='is_verified') THEN
    ALTER TABLE venues ADD COLUMN is_verified BOOLEAN DEFAULT false;
  END IF;
  
  -- Add source tracking
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='source') THEN
    ALTER TABLE venues ADD COLUMN source VARCHAR(50);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='source_id') THEN
    ALTER TABLE venues ADD COLUMN source_id VARCHAR(200);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='last_scraped_at') THEN
    ALTER TABLE venues ADD COLUMN last_scraped_at TIMESTAMPTZ;
  END IF;
  
  -- Add SEO fields
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='meta_title') THEN
    ALTER TABLE venues ADD COLUMN meta_title VARCHAR(200);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='venues' AND column_name='meta_description') THEN
    ALTER TABLE venues ADD COLUMN meta_description VARCHAR(500);
  END IF;
END $$;

-- Add new indexes for venues
CREATE INDEX IF NOT EXISTS idx_venues_area ON venues(area_id);
CREATE INDEX IF NOT EXISTS idx_venues_category ON venues(category_id);
CREATE INDEX IF NOT EXISTS idx_venues_location ON venues USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_venues_source ON venues(source, source_id);
CREATE INDEX IF NOT EXISTS idx_venues_features ON venues USING GIN(features);
CREATE INDEX IF NOT EXISTS idx_venues_cuisine ON venues USING GIN(cuisine_types);

-- ============================================
-- VENUE_IMAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS venue_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(300),
  display_order INTEGER DEFAULT 0,
  is_cover BOOLEAN DEFAULT false,
  source VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_venue_images_venue ON venue_images(venue_id);
CREATE INDEX IF NOT EXISTS idx_venue_images_cover ON venue_images(venue_id) WHERE is_cover = true;

-- ============================================
-- VENUE_CATEGORIES (junction table for multi-category)
-- ============================================
CREATE TABLE IF NOT EXISTS venue_categories (
  venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (venue_id, category_id)
);

-- ============================================
-- CINEMAS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS cinemas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  venue_id UUID REFERENCES venues(id),
  name VARCHAR(300) NOT NULL,
  slug VARCHAR(300) NOT NULL UNIQUE,
  chain VARCHAR(100),
  address TEXT,
  area_id UUID REFERENCES areas(id),
  latitude DECIMAL(10,7),
  longitude DECIMAL(11,7),
  screen_count INTEGER,
  has_imax BOOLEAN DEFAULT false,
  has_4dx BOOLEAN DEFAULT false,
  has_dolby BOOLEAN DEFAULT false,
  phone VARCHAR(20),
  booking_url VARCHAR(500),
  google_place_id VARCHAR(200),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cinemas_slug ON cinemas(slug);
CREATE INDEX IF NOT EXISTS idx_cinemas_area ON cinemas(area_id);
CREATE INDEX IF NOT EXISTS idx_cinemas_chain ON cinemas(chain);

-- ============================================
-- ENHANCE MOVIES TABLE
-- ============================================
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='movies' AND column_name='duration_minutes') THEN
    ALTER TABLE movies ADD COLUMN duration_minutes INTEGER;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='movies' AND column_name='certification') THEN
    ALTER TABLE movies ADD COLUMN certification VARCHAR(10);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='movies' AND column_name='rating_rotten') THEN
    ALTER TABLE movies ADD COLUMN rating_rotten INTEGER;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='movies' AND column_name='trailer_youtube_id') THEN
    ALTER TABLE movies ADD COLUMN trailer_youtube_id VARCHAR(20);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='movies' AND column_name='booking_url') THEN
    ALTER TABLE movies ADD COLUMN booking_url VARCHAR(500);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='movies' AND column_name='source_id') THEN
    ALTER TABLE movies ADD COLUMN source_id VARCHAR(200);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='movies' AND column_name='last_scraped_at') THEN
    ALTER TABLE movies ADD COLUMN last_scraped_at TIMESTAMPTZ;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='movies' AND column_name='is_active') THEN
    ALTER TABLE movies ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;
END $$;

-- ============================================
-- SHOWTIMES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS showtimes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  movie_id UUID NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  cinema_id UUID NOT NULL REFERENCES cinemas(id) ON DELETE CASCADE,
  show_date DATE NOT NULL,
  show_time TIME NOT NULL,
  screen_type VARCHAR(50),
  language VARCHAR(50),
  price_min INTEGER,
  price_max INTEGER,
  booking_url VARCHAR(500),
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_showtimes_movie ON showtimes(movie_id);
CREATE INDEX IF NOT EXISTS idx_showtimes_cinema ON showtimes(cinema_id);
CREATE INDEX IF NOT EXISTS idx_showtimes_date ON showtimes(show_date);
CREATE INDEX IF NOT EXISTS idx_showtimes_available ON showtimes(movie_id, show_date) WHERE is_available = true;

-- ============================================
-- ENHANCE EVENTS TABLE
-- ============================================
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='events' AND column_name='area_id') THEN
    ALTER TABLE events ADD COLUMN area_id UUID REFERENCES areas(id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='events' AND column_name='category_id') THEN
    ALTER TABLE events ADD COLUMN category_id UUID REFERENCES categories(id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='events' AND column_name='tags') THEN
    ALTER TABLE events ADD COLUMN tags TEXT[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='events' AND column_name='source_url') THEN
    ALTER TABLE events ADD COLUMN source_url VARCHAR(500);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='events' AND column_name='description_raw') THEN
    ALTER TABLE events ADD COLUMN description_raw TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='events' AND column_name='last_scraped_at') THEN
    ALTER TABLE events ADD COLUMN last_scraped_at TIMESTAMPTZ;
  END IF;
END $$;

-- ============================================
-- AI_CONVERSATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(100) NOT NULL,
  user_query TEXT NOT NULL,
  ai_response TEXT,
  intent_detected VARCHAR(100),
  venues_returned UUID[],
  response_time_ms INTEGER,
  user_lat DECIMAL(10,7),
  user_lng DECIMAL(10,7),
  user_area VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_conversations_session ON ai_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_intent ON ai_conversations(intent_detected);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_created ON ai_conversations(created_at DESC);

-- ============================================
-- REVIEWS TABLE (Phase 2, but create now)
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  user_name VARCHAR(100),
  rating DECIMAL(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_venue ON reviews(venue_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(venue_id, rating DESC);

-- ============================================
-- ITINERARIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS itineraries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(300) NOT NULL UNIQUE,
  description TEXT,
  category VARCHAR(100),
  area_id UUID REFERENCES areas(id),
  budget_range VARCHAR(50),
  duration_hours DECIMAL(3,1),
  stops JSONB NOT NULL DEFAULT '[]',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_itineraries_slug ON itineraries(slug);
CREATE INDEX IF NOT EXISTS idx_itineraries_category ON itineraries(category);
CREATE INDEX IF NOT EXISTS idx_itineraries_area ON itineraries(area_id);

-- ============================================
-- SEO_PAGES TABLE (programmatic SEO)
-- ============================================
CREATE TABLE IF NOT EXISTS seo_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(300) NOT NULL UNIQUE,
  page_type VARCHAR(50) NOT NULL,
  content TEXT,
  area_id UUID REFERENCES areas(id),
  category_id UUID REFERENCES categories(id),
  venue_ids UUID[],
  meta_title VARCHAR(200),
  meta_description VARCHAR(500),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_seo_pages_slug ON seo_pages(slug);
CREATE INDEX IF NOT EXISTS idx_seo_pages_type ON seo_pages(page_type);
CREATE INDEX IF NOT EXISTS idx_seo_pages_area ON seo_pages(area_id);
CREATE INDEX IF NOT EXISTS idx_seo_pages_category ON seo_pages(category_id);
CREATE INDEX IF NOT EXISTS idx_seo_pages_published ON seo_pages(is_published) WHERE is_published = true;

-- ============================================
-- SPONSORS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS sponsors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name VARCHAR(300) NOT NULL,
  tier VARCHAR(50),
  categories_sponsored UUID[],
  logo_url VARCHAR(500),
  website_url VARCHAR(500),
  start_date DATE,
  end_date DATE,
  monthly_rate INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY FOR NEW TABLES
-- ============================================
ALTER TABLE areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE cinemas ENABLE ROW LEVEL SECURITY;
ALTER TABLE showtimes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read areas" ON areas FOR SELECT USING (is_active = true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read venue_images" ON venue_images FOR SELECT USING (true);
CREATE POLICY "Public read venue_categories" ON venue_categories FOR SELECT USING (true);
CREATE POLICY "Public read cinemas" ON cinemas FOR SELECT USING (is_active = true);
CREATE POLICY "Public read showtimes" ON showtimes FOR SELECT USING (is_available = true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (is_active = true);
CREATE POLICY "Public read itineraries" ON itineraries FOR SELECT USING (is_active = true);
CREATE POLICY "Public read seo_pages" ON seo_pages FOR SELECT USING (is_published = true);
CREATE POLICY "Public read sponsors" ON sponsors FOR SELECT USING (is_active = true);

-- Service role full access
CREATE POLICY "Service role areas" ON areas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role venue_images" ON venue_images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role venue_categories" ON venue_categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role cinemas" ON cinemas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role showtimes" ON showtimes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role ai_conversations" ON ai_conversations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role reviews" ON reviews FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role itineraries" ON itineraries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role seo_pages" ON seo_pages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role sponsors" ON sponsors FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- UPDATED_AT TRIGGERS FOR NEW TABLES
-- ============================================
CREATE TRIGGER areas_updated_at BEFORE UPDATE ON areas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER seo_pages_updated_at BEFORE UPDATE ON seo_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- GRANT PERMISSIONS
-- ============================================
GRANT SELECT ON areas TO anon, authenticated;
GRANT SELECT ON categories TO anon, authenticated;
GRANT SELECT ON venue_images TO anon, authenticated;
GRANT SELECT ON venue_categories TO anon, authenticated;
GRANT SELECT ON cinemas TO anon, authenticated;
GRANT SELECT ON showtimes TO anon, authenticated;
GRANT SELECT ON reviews TO anon, authenticated;
GRANT SELECT ON itineraries TO anon, authenticated;
GRANT SELECT ON seo_pages TO anon, authenticated;
GRANT SELECT ON sponsors TO anon, authenticated;

GRANT ALL ON areas TO service_role;
GRANT ALL ON categories TO service_role;
GRANT ALL ON venue_images TO service_role;
GRANT ALL ON venue_categories TO service_role;
GRANT ALL ON cinemas TO service_role;
GRANT ALL ON showtimes TO service_role;
GRANT ALL ON ai_conversations TO service_role;
GRANT ALL ON reviews TO service_role;
GRANT ALL ON itineraries TO service_role;
GRANT ALL ON seo_pages TO service_role;
GRANT ALL ON sponsors TO service_role;

-- ============================================
-- DONE!
-- ============================================
SELECT 'Schema enhancement complete!' as status;
