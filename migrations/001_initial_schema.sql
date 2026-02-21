-- BangaloreLife.com - Initial Database Schema
-- Run this in Supabase Dashboard > SQL Editor

-- ================================
-- EVENTS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'events',
  
  -- Location
  venue_name TEXT,
  venue_id UUID,
  city TEXT DEFAULT 'bangalore',
  
  -- Date & Time
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TEXT,
  
  -- Pricing
  price TEXT,
  price_min NUMERIC,
  price_currency TEXT DEFAULT 'INR',
  
  -- Images
  image_url TEXT,
  
  -- Booking - BookMyShow via INRDeals
  booking_url TEXT,
  affiliate_url TEXT,
  
  -- Source tracking
  source_name TEXT,
  source_event_id TEXT,
  
  -- Flags
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================
-- VENUES TABLE
-- ================================
CREATE TABLE IF NOT EXISTS venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- pub, bar, club, brewery, lounge, restaurant, cafe
  
  -- Location
  neighborhood TEXT NOT NULL, -- koramangala, indiranagar, mg-road, whitefield, hsr-layout, etc.
  address TEXT,
  city TEXT DEFAULT 'bangalore',
  
  -- Contact
  phone TEXT,
  website TEXT,
  google_maps_url TEXT,
  
  -- Details
  price_range TEXT, -- ₹, ₹₹, ₹₹₹, ₹₹₹₹
  cuisine TEXT[], -- array of cuisine types
  features TEXT[], -- rooftop, live-music, craft-beer, dj, sports-bar, etc.
  timings TEXT,
  
  -- Images
  image_url TEXT,
  
  -- Rating
  rating NUMERIC,
  
  -- Flags
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================
-- MOVIES TABLE
-- ================================
CREATE TABLE IF NOT EXISTS movies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  overview TEXT,
  
  -- TMDB Data
  tmdb_id INTEGER,
  poster_url TEXT,
  backdrop_url TEXT,
  trailer_url TEXT,
  rating NUMERIC,
  runtime INTEGER,
  release_date DATE,
  genres TEXT[] DEFAULT '{}',
  language TEXT DEFAULT 'EN',
  
  -- Status
  status TEXT DEFAULT 'now_showing', -- 'now_showing' or 'coming_soon'
  
  -- Display
  is_featured BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================
-- INDEXES
-- ================================
CREATE INDEX IF NOT EXISTS idx_events_city ON events(city);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_is_active ON events(is_active);
CREATE INDEX IF NOT EXISTS idx_events_is_featured ON events(is_featured);

CREATE INDEX IF NOT EXISTS idx_venues_city ON venues(city);
CREATE INDEX IF NOT EXISTS idx_venues_neighborhood ON venues(neighborhood);
CREATE INDEX IF NOT EXISTS idx_venues_category ON venues(category);
CREATE INDEX IF NOT EXISTS idx_venues_is_active ON venues(is_active);
CREATE INDEX IF NOT EXISTS idx_venues_is_featured ON venues(is_featured);

CREATE INDEX IF NOT EXISTS idx_movies_status ON movies(status);
CREATE INDEX IF NOT EXISTS idx_movies_language ON movies(language);
CREATE INDEX IF NOT EXISTS idx_movies_is_featured ON movies(is_featured);

-- ================================
-- ROW LEVEL SECURITY (RLS)
-- ================================
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

-- Public can read active records
CREATE POLICY "Public can view active events" ON events
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view active venues" ON venues
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view movies" ON movies
  FOR SELECT USING (true);

-- Service role can do everything
CREATE POLICY "Service role has full access to events" ON events
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to venues" ON venues
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to movies" ON movies
  FOR ALL USING (auth.role() = 'service_role');

-- ================================
-- UPDATED_AT TRIGGER
-- ================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_venues_updated_at
  BEFORE UPDATE ON venues
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_movies_updated_at
  BEFORE UPDATE ON movies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================
-- VERIFY
-- ================================
SELECT 'BangaloreLife schema created successfully!' AS status;
