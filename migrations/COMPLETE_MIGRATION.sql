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
-- BangaloreLife.com - Seed Areas Data
-- 50+ Bangalore neighborhoods with coordinates and metadata

INSERT INTO areas (name, slug, description, latitude, longitude, vibe_tags, meta_title, meta_description) VALUES

-- Core Nightlife & Dining Hubs
('Koramangala', 'koramangala', 'Bangalore''s most vibrant neighborhood for startups, nightlife, and food. Home to iconic breweries, rooftop bars, and late-night eateries.', 12.9352, 77.6245, ARRAY['nightlife', 'trendy', 'startup-hub', 'food-scene'], 'Best Places in Koramangala, Bangalore | Restaurants, Bars & Nightlife', 'Discover the best restaurants, bars, pubs, and nightlife spots in Koramangala. Your complete guide to Bangalore''s startup hub.'),

('Indiranagar', 'indiranagar', 'Upscale neighborhood known for boutique cafes, craft breweries, live music venues, and 100 Feet Road''s restaurant row.', 12.9784, 77.6408, ARRAY['upscale', 'trendy', 'cafes', 'live-music', 'boutique'], 'Best Places in Indiranagar, Bangalore | Cafes, Pubs & Fine Dining', 'Explore Indiranagar''s best cafes, breweries, and restaurants. The definitive guide to 100 Feet Road and beyond.'),

('MG Road', 'mg-road', 'The heart of central Bangalore. Historic shopping street with iconic pubs, rooftop lounges, and easy metro access.', 12.9758, 77.6065, ARRAY['central', 'iconic', 'shopping', 'nightlife'], 'MG Road Bangalore | Pubs, Shopping & Nightlife Guide', 'MG Road is Bangalore''s central hub for shopping, nightlife, and dining. Discover the best spots on this iconic street.'),

('Brigade Road', 'brigade-road', 'Parallel to MG Road, Brigade Road is famous for shopping, street food, and legendary pubs like Pecos.', 12.9737, 77.6078, ARRAY['shopping', 'street-food', 'iconic', 'nightlife'], 'Brigade Road Bangalore | Shopping, Pubs & Street Food', 'Complete guide to Brigade Road - from iconic pubs to street shopping and late-night food spots.'),

('Church Street', 'church-street', 'Charming pedestrianized street with European vibes, indie cafes, live music venues, and quirky boutiques.', 12.9753, 77.6044, ARRAY['charming', 'cafes', 'live-music', 'indie', 'walkable'], 'Church Street Bangalore | Cafes, Music & Nightlife', 'Church Street is Bangalore''s most walkable food and music destination. Discover indie cafes, live venues, and hidden bars.'),

('HSR Layout', 'hsr-layout', 'Residential area turned foodie paradise. Great for cafes, local restaurants, and chill hangouts. Popular with young professionals.', 12.9116, 77.6389, ARRAY['cafes', 'chill', 'residential', 'young-professionals'], 'HSR Layout Bangalore | Cafes, Restaurants & Local Favorites', 'HSR Layout''s best cafes, restaurants, and hangout spots. A local''s guide to this evolving neighborhood.'),

('Whitefield', 'whitefield', 'Bangalore''s IT hub on the eastern edge. Modern malls, international restaurants, and a growing nightlife scene.', 12.9698, 77.7500, ARRAY['it-hub', 'modern', 'malls', 'international'], 'Whitefield Bangalore | Restaurants, Pubs & Weekend Spots', 'Explore Whitefield''s dining and nightlife scene. From mall restaurants to hidden gems in Bangalore''s IT corridor.'),

('Electronic City', 'electronic-city', 'Major IT park area with corporate dining, pubs, and weekend entertainment options for the tech crowd.', 12.8456, 77.6603, ARRAY['it-hub', 'corporate', 'tech'], 'Electronic City Bangalore | Restaurants & After-Work Spots', 'Best restaurants and hangouts in Electronic City for the tech workforce.'),

('JP Nagar', 'jp-nagar', 'Large residential area spanning multiple phases. Known for family restaurants, local eateries, and community vibes.', 12.9066, 77.5850, ARRAY['family', 'residential', 'local-favorites'], 'JP Nagar Bangalore | Family Restaurants & Local Spots', 'JP Nagar''s best family restaurants and local eateries across all phases.'),

('Jayanagar', 'jayanagar', 'Old Bangalore charm with traditional South Indian restaurants, iconic bakeries, and shopping blocks.', 12.9299, 77.5826, ARRAY['traditional', 'family', 'south-indian', 'heritage'], 'Jayanagar Bangalore | Traditional Restaurants & Heritage Spots', 'Experience authentic Bangalore in Jayanagar. Traditional eateries, iconic bakeries, and local favorites.'),

('Banashankari', 'banashankari', 'Temple area with traditional dining, street food, and family-friendly restaurants.', 12.9255, 77.5468, ARRAY['traditional', 'temple', 'family', 'street-food'], 'Banashankari Bangalore | Traditional Food & Family Dining', 'Banashankari''s best traditional restaurants and family dining options near the iconic temple.'),

('BTM Layout', 'btm-layout', 'Affordable foodie destination popular with students and young professionals. Known for diverse cuisines and budget eats.', 12.9166, 77.6101, ARRAY['budget', 'diverse', 'student-friendly', 'food-variety'], 'BTM Layout Bangalore | Budget Eats & Diverse Cuisines', 'BTM Layout''s best budget restaurants and diverse food options. Perfect for students and young professionals.'),

('Marathahalli', 'marathahalli', 'IT corridor area with corporate restaurants, quick bites, and growing nightlife options.', 12.9591, 77.7019, ARRAY['it-corridor', 'corporate', 'quick-bites'], 'Marathahalli Bangalore | IT Corridor Restaurants & Pubs', 'Best restaurants and after-work spots in Marathahalli''s IT corridor.'),

('Bellandur', 'bellandur', 'Rapidly developing IT area with new restaurants, cafes, and entertainment options.', 12.9260, 77.6762, ARRAY['developing', 'it-hub', 'new'], 'Bellandur Bangalore | New Restaurants & Cafes', 'Discover Bellandur''s growing food and entertainment scene.'),

('Sarjapur Road', 'sarjapur-road', 'Long IT corridor with numerous restaurants, pubs, and entertainment options catering to tech workers.', 12.9103, 77.6855, ARRAY['it-corridor', 'growing', 'diverse'], 'Sarjapur Road Bangalore | Restaurants & Entertainment', 'Sarjapur Road''s best dining and nightlife options along the IT corridor.'),

('Hebbal', 'hebbal', 'North Bangalore hub near the airport road. Mix of old Bangalore charm and new developments.', 13.0358, 77.5970, ARRAY['north', 'airport-access', 'developing'], 'Hebbal Bangalore | Restaurants & North Bangalore Spots', 'Hebbal''s best restaurants and hangouts in North Bangalore.'),

('Yelahanka', 'yelahanka', 'North Bangalore area with Air Force presence, local markets, and growing food scene.', 13.1007, 77.5963, ARRAY['north', 'local', 'growing'], 'Yelahanka Bangalore | Local Restaurants & Markets', 'Discover Yelahanka''s local food scene in North Bangalore.'),

('Malleshwaram', 'malleshwaram', 'Heritage area with traditional South Indian restaurants, historic temples, and old-world charm.', 13.0035, 77.5647, ARRAY['heritage', 'traditional', 'temples', 'south-indian'], 'Malleshwaram Bangalore | Traditional Restaurants & Heritage Spots', 'Experience old Bangalore in Malleshwaram. Traditional restaurants, temples, and heritage walks.'),

('Rajajinagar', 'rajajinagar', 'Established residential area with local restaurants, shopping, and easy access to central Bangalore.', 12.9914, 77.5521, ARRAY['residential', 'local', 'established'], 'Rajajinagar Bangalore | Local Restaurants & Shops', 'Rajajinagar''s best local restaurants and neighborhood favorites.'),

('Basavanagudi', 'basavanagudi', 'Historic neighborhood near Lalbagh with heritage restaurants, traditional eateries, and cultural landmarks.', 12.9419, 77.5752, ARRAY['heritage', 'traditional', 'cultural', 'lalbagh'], 'Basavanagudi Bangalore | Heritage Restaurants & Cultural Spots', 'Basavanagudi''s heritage eateries and cultural landmarks near Lalbagh.'),

('Sadashivanagar', 'sadashivanagar', 'Upscale residential area with high-end restaurants, quiet cafes, and exclusive lounges.', 13.0080, 77.5755, ARRAY['upscale', 'quiet', 'exclusive', 'residential'], 'Sadashivanagar Bangalore | Fine Dining & Exclusive Spots', 'Sadashivanagar''s upscale dining and exclusive venues.'),

('UB City', 'ub-city', 'Bangalore''s premier luxury destination. High-end restaurants, designer stores, and rooftop lounges.', 12.9716, 77.5963, ARRAY['luxury', 'high-end', 'designer', 'rooftop'], 'UB City Bangalore | Luxury Dining & Premium Experiences', 'UB City''s finest restaurants, bars, and luxury experiences in Bangalore.'),

('Lavelle Road', 'lavelle-road', 'Premium dining and nightlife stretch near UB City. Upscale bars, lounges, and fine dining.', 12.9687, 77.5982, ARRAY['premium', 'nightlife', 'fine-dining', 'upscale'], 'Lavelle Road Bangalore | Premium Bars & Fine Dining', 'Lavelle Road''s best upscale bars, lounges, and restaurants.'),

('Residency Road', 'residency-road', 'Central business area with corporate restaurants, iconic establishments, and after-work spots.', 12.9699, 77.6012, ARRAY['central', 'corporate', 'iconic'], 'Residency Road Bangalore | Corporate Dining & Iconic Spots', 'Residency Road''s best restaurants and after-work destinations.'),

('Commercial Street', 'commercial-street', 'Famous shopping destination with street food, quick bites, and bustling market vibes.', 12.9830, 77.6075, ARRAY['shopping', 'street-food', 'bustling', 'market'], 'Commercial Street Bangalore | Street Food & Shopping', 'Commercial Street''s best street food and quick bites while shopping.'),

('Cunningham Road', 'cunningham-road', 'Upscale area with premium restaurants, luxury hotels, and exclusive venues.', 12.9875, 77.5895, ARRAY['upscale', 'hotels', 'premium'], 'Cunningham Road Bangalore | Premium Dining & Hotels', 'Cunningham Road''s finest restaurants and luxury hotel dining.'),

('Frazer Town', 'frazer-town', 'Multi-cultural neighborhood famous for biryani, kebabs, and diverse cuisines. Foodie paradise after dark.', 13.0020, 77.6135, ARRAY['biryani', 'kebabs', 'multicultural', 'night-food'], 'Frazer Town Bangalore | Biryani, Kebabs & Night Food', 'Frazer Town''s legendary biryani joints, kebab spots, and late-night food scene.'),

('Cox Town', 'cox-town', 'Quiet residential area with local eateries and easy access to Frazer Town food scene.', 13.0000, 77.6200, ARRAY['quiet', 'residential', 'local'], 'Cox Town Bangalore | Local Restaurants', 'Cox Town''s neighborhood restaurants and local favorites.'),

('Richmond Town', 'richmond-town', 'Central area with diverse dining options, from budget to premium.', 12.9623, 77.6005, ARRAY['central', 'diverse', 'accessible'], 'Richmond Town Bangalore | Diverse Dining Options', 'Richmond Town''s variety of restaurants from budget to premium.'),

('Shanti Nagar', 'shanti-nagar', 'Central residential area with local restaurants and easy metro access.', 12.9567, 77.5995, ARRAY['central', 'residential', 'metro'], 'Shanti Nagar Bangalore | Local Restaurants', 'Shanti Nagar''s local dining spots with metro connectivity.'),

('Wilson Garden', 'wilson-garden', 'Old Bangalore area with traditional eateries and local markets.', 12.9466, 77.5980, ARRAY['traditional', 'local', 'markets'], 'Wilson Garden Bangalore | Traditional Eateries', 'Wilson Garden''s traditional restaurants and local markets.'),

('Lalbagh', 'lalbagh', 'Historic botanical garden area with heritage restaurants and peaceful cafes.', 12.9507, 77.5848, ARRAY['heritage', 'peaceful', 'garden', 'cafes'], 'Lalbagh Area Bangalore | Heritage Cafes & Restaurants', 'Restaurants and cafes near Bangalore''s iconic Lalbagh Botanical Garden.'),

('Bannerghatta Road', 'bannerghatta-road', 'Long southern corridor with diverse dining options and access to the national park.', 12.8889, 77.5973, ARRAY['south', 'diverse', 'nature'], 'Bannerghatta Road Bangalore | Restaurants & Nature Access', 'Dining options along Bannerghatta Road toward the national park.'),

('Arekere', 'arekere', 'Growing southern area with new restaurants and residential developments.', 12.8955, 77.6095, ARRAY['growing', 'residential', 'south'], 'Arekere Bangalore | New Restaurants', 'Arekere''s growing food scene in South Bangalore.'),

('Begur', 'begur', 'Developing southern area with local eateries and new establishments.', 12.8761, 77.6358, ARRAY['developing', 'local', 'south'], 'Begur Bangalore | Local Restaurants', 'Begur''s local restaurants and new food spots.'),

('Hulimavu', 'hulimavu', 'Residential area with family restaurants and local favorites.', 12.8837, 77.5995, ARRAY['residential', 'family', 'local'], 'Hulimavu Bangalore | Family Restaurants', 'Hulimavu''s family-friendly restaurants and local spots.'),

('Bommanahalli', 'bommanahalli', 'Transit hub area with diverse quick-service restaurants and local eateries.', 12.9017, 77.6200, ARRAY['transit', 'diverse', 'quick-service'], 'Bommanahalli Bangalore | Quick Bites & Local Food', 'Bommanahalli''s diverse food options near the transit hub.'),

('Silk Board', 'silk-board', 'Major junction area with restaurants catering to commuters and office workers.', 12.9172, 77.6225, ARRAY['junction', 'commuter', 'quick-bites'], 'Silk Board Area Bangalore | Commuter Restaurants', 'Restaurants near Bangalore''s busiest junction.'),

('RT Nagar', 'rt-nagar', 'North Bangalore residential area with local restaurants and markets.', 13.0214, 77.5920, ARRAY['north', 'residential', 'local'], 'RT Nagar Bangalore | Local Restaurants', 'RT Nagar''s local restaurants and neighborhood spots.'),

('Sanjaynagar', 'sanjaynagar', 'Residential area near Hebbal with local eateries and quiet cafes.', 13.0300, 77.5750, ARRAY['residential', 'quiet', 'local'], 'Sanjaynagar Bangalore | Local Cafes & Restaurants', 'Sanjaynagar''s quiet cafes and local restaurants.'),

('Sahakarnagar', 'sahakarnagar', 'North Bangalore area with local restaurants and community dining.', 13.0600, 77.5800, ARRAY['north', 'community', 'local'], 'Sahakarnagar Bangalore | Community Restaurants', 'Sahakarnagar''s local dining and community spots.'),

('Vijayanagar', 'vijayanagar', 'West Bangalore residential area with diverse local restaurants.', 12.9700, 77.5350, ARRAY['west', 'residential', 'diverse'], 'Vijayanagar Bangalore | Local Restaurants', 'Vijayanagar''s diverse local restaurants in West Bangalore.'),

('RR Nagar', 'rr-nagar', 'Rajarajeshwari Nagar - large western area with local restaurants and shopping.', 12.9200, 77.5200, ARRAY['west', 'large', 'shopping'], 'RR Nagar Bangalore | Local Restaurants & Shopping', 'RR Nagar''s restaurants and shopping destinations.'),

('Kengeri', 'kengeri', 'Southwestern suburb with local eateries and satellite town vibes.', 12.9100, 77.4900, ARRAY['suburb', 'local', 'southwest'], 'Kengeri Bangalore | Local Restaurants', 'Kengeri''s local restaurants in the southwestern suburb.'),

('Brookefield', 'brookefield', 'IT area near Whitefield with restaurants, cafes, and weekend spots.', 12.9650, 77.7200, ARRAY['it-area', 'cafes', 'developing'], 'Brookefield Bangalore | IT Area Restaurants & Cafes', 'Brookefield''s restaurants and cafes near Whitefield.'),

('ITPL', 'itpl', 'International Tech Park area with corporate dining and after-work entertainment.', 12.9850, 77.7300, ARRAY['tech-park', 'corporate', 'entertainment'], 'ITPL Bangalore | Tech Park Restaurants & Entertainment', 'Dining and entertainment options at International Tech Park.'),

('KR Puram', 'kr-puram', 'Eastern junction area with local restaurants and transit connectivity.', 13.0100, 77.6900, ARRAY['east', 'junction', 'transit'], 'KR Puram Bangalore | Local Restaurants', 'KR Puram''s local restaurants near the eastern junction.'),

('Mahadevapura', 'mahadevapura', 'Growing IT hub with new restaurants, cafes, and entertainment options.', 12.9900, 77.7000, ARRAY['it-hub', 'growing', 'new'], 'Mahadevapura Bangalore | New Restaurants & Cafes', 'Mahadevapura''s growing food and entertainment scene.'),

('Hennur', 'hennur', 'North-eastern area with local restaurants and new developments.', 13.0350, 77.6400, ARRAY['northeast', 'developing', 'local'], 'Hennur Bangalore | Local Restaurants', 'Hennur''s local restaurants and new food spots.'),

('Kalyan Nagar', 'kalyan-nagar', 'Residential area with growing cafe culture and local restaurants.', 13.0250, 77.6350, ARRAY['residential', 'cafes', 'growing'], 'Kalyan Nagar Bangalore | Cafes & Local Restaurants', 'Kalyan Nagar''s cafe culture and local dining spots.'),

('Kammanahalli', 'kammanahalli', 'Diverse neighborhood with cafes, local eateries, and community vibes.', 13.0150, 77.6400, ARRAY['diverse', 'cafes', 'community'], 'Kammanahalli Bangalore | Cafes & Community Dining', 'Kammanahalli''s diverse cafes and community restaurants.'),

('HRBR Layout', 'hrbr-layout', 'Residential area with local restaurants and quiet cafes.', 13.0100, 77.6300, ARRAY['residential', 'quiet', 'local'], 'HRBR Layout Bangalore | Local Restaurants', 'HRBR Layout''s quiet neighborhood restaurants.'),

('Banaswadi', 'banaswadi', 'East Bangalore area with local restaurants and traditional eateries.', 13.0100, 77.6500, ARRAY['east', 'traditional', 'local'], 'Banaswadi Bangalore | Traditional Restaurants', 'Banaswadi''s traditional eateries and local favorites.'),

('CV Raman Nagar', 'cv-raman-nagar', 'East Bangalore residential area with local restaurants.', 12.9850, 77.6600, ARRAY['east', 'residential', 'local'], 'CV Raman Nagar Bangalore | Local Restaurants', 'CV Raman Nagar''s local dining spots.')

ON CONFLICT (slug) DO UPDATE SET
  description = EXCLUDED.description,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  vibe_tags = EXCLUDED.vibe_tags,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  updated_at = NOW();

-- Update location geography from lat/lng
UPDATE areas 
SET location = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography
WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

SELECT COUNT(*) as areas_seeded FROM areas;
-- BangaloreLife.com - Seed Categories Data
-- Full hierarchy from blueprint

-- Helper function to get category UUID by slug
CREATE OR REPLACE FUNCTION get_category_id(cat_slug TEXT) RETURNS UUID AS $$
  SELECT id FROM categories WHERE slug = cat_slug LIMIT 1;
$$ LANGUAGE SQL;

-- ============================================
-- TOP-LEVEL CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, icon, color, description, display_order) VALUES
('Food & Dining', 'food-dining', 'utensils', '#F97316', 'Restaurants, cafes, street food, and everything delicious in Bangalore', 1),
('Nightlife', 'nightlife', 'moon', '#8B5CF6', 'Bars, clubs, lounges, and late-night entertainment', 2),
('Movies & Entertainment', 'movies-entertainment', 'film', '#EC4899', 'Cinemas, theaters, gaming, and fun activities', 3),
('Shopping', 'shopping', 'shopping-bag', '#14B8A6', 'Malls, markets, and retail destinations', 4),
('Health & Wellness', 'health-wellness', 'heart-pulse', '#22C55E', 'Gyms, spas, hospitals, and wellness centers', 5),
('Coworking & Business', 'coworking-business', 'briefcase', '#3B82F6', 'Coworking spaces, meeting rooms, and business hubs', 6),
('Education', 'education', 'graduation-cap', '#6366F1', 'Classes, workshops, and learning centers', 7),
('Events', 'events', 'calendar', '#F43F5E', 'Concerts, festivals, meetups, and happenings', 8),
('Travel & Getaways', 'travel-getaways', 'compass', '#0EA5E9', 'Weekend trips, resorts, and adventures near Bangalore', 9),
('Family & Kids', 'family-kids', 'baby', '#A855F7', 'Kid-friendly activities, play areas, and family fun', 10),
('Pets', 'pets', 'dog', '#84CC16', 'Vets, pet shops, grooming, and pet-friendly places', 11),
('Home Services', 'home-services', 'wrench', '#64748B', 'Plumbers, electricians, movers, and home help', 12),
('Transport', 'transport', 'car', '#78716C', 'Metro, parking, rentals, and getting around', 13),
('Real Estate', 'real-estate', 'home', '#B45309', 'PGs, co-living, and finding a place to stay', 14)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  description = EXCLUDED.description,
  display_order = EXCLUDED.display_order;

-- ============================================
-- FOOD & DINING SUB-CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, parent_id, icon, color, description, display_order) VALUES
('Restaurants', 'restaurants', get_category_id('food-dining'), 'utensils-crossed', '#F97316', 'Full-service restaurants for dine-in experiences', 1),
('Cafes', 'cafes', get_category_id('food-dining'), 'coffee', '#F97316', 'Coffee shops, tea houses, and casual hangouts', 2),
('Street Food', 'street-food', get_category_id('food-dining'), 'shopping-cart', '#F97316', 'Local street eats and food stalls', 3),
('Bakeries', 'bakeries', get_category_id('food-dining'), 'cake', '#F97316', 'Fresh bread, cakes, and baked goods', 4),
('Bars & Pubs', 'bars-pubs', get_category_id('food-dining'), 'beer', '#F97316', 'Drinking establishments with food', 5),
('Breweries', 'breweries', get_category_id('food-dining'), 'beer', '#F97316', 'Craft beer breweries and taprooms', 6),
('Cloud Kitchens', 'cloud-kitchens', get_category_id('food-dining'), 'truck', '#F97316', 'Delivery-only restaurants', 7)
ON CONFLICT (slug) DO UPDATE SET
  parent_id = EXCLUDED.parent_id,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  description = EXCLUDED.description;

-- ============================================
-- NIGHTLIFE SUB-CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, parent_id, icon, color, description, display_order) VALUES
('Clubs', 'clubs', get_category_id('nightlife'), 'disc', '#8B5CF6', 'Dance clubs and nightclubs', 1),
('Lounges', 'lounges', get_category_id('nightlife'), 'sofa', '#8B5CF6', 'Upscale lounges and chill spots', 2),
('Live Music', 'live-music', get_category_id('nightlife'), 'music', '#8B5CF6', 'Live music venues and concert spots', 3),
('Karaoke', 'karaoke', get_category_id('nightlife'), 'mic', '#8B5CF6', 'Karaoke bars and singing spots', 4),
('Comedy Clubs', 'comedy-clubs', get_category_id('nightlife'), 'laugh', '#8B5CF6', 'Stand-up comedy venues', 5),
('Rooftop Bars', 'rooftop-bars', get_category_id('nightlife'), 'building', '#8B5CF6', 'Rooftop bars with views', 6)
ON CONFLICT (slug) DO UPDATE SET
  parent_id = EXCLUDED.parent_id,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description;

-- ============================================
-- MOVIES & ENTERTAINMENT SUB-CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, parent_id, icon, color, description, display_order) VALUES
('Cinemas', 'cinemas', get_category_id('movies-entertainment'), 'clapperboard', '#EC4899', 'Movie theaters and multiplexes', 1),
('Theaters', 'theaters', get_category_id('movies-entertainment'), 'theater', '#EC4899', 'Live theater and drama performances', 2),
('Gaming Zones', 'gaming-zones', get_category_id('movies-entertainment'), 'gamepad-2', '#EC4899', 'Arcades and gaming centers', 3),
('Bowling', 'bowling', get_category_id('movies-entertainment'), 'circle', '#EC4899', 'Bowling alleys', 4),
('Escape Rooms', 'escape-rooms', get_category_id('movies-entertainment'), 'key', '#EC4899', 'Escape room experiences', 5)
ON CONFLICT (slug) DO UPDATE SET
  parent_id = EXCLUDED.parent_id,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description;

-- ============================================
-- SHOPPING SUB-CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, parent_id, icon, color, description, display_order) VALUES
('Malls', 'malls', get_category_id('shopping'), 'building-2', '#14B8A6', 'Shopping malls and complexes', 1),
('Street Markets', 'street-markets', get_category_id('shopping'), 'store', '#14B8A6', 'Street shopping and local markets', 2),
('Electronics', 'electronics', get_category_id('shopping'), 'smartphone', '#14B8A6', 'Electronics and gadget shops', 3),
('Fashion', 'fashion', get_category_id('shopping'), 'shirt', '#14B8A6', 'Clothing and fashion stores', 4),
('Books', 'books', get_category_id('shopping'), 'book-open', '#14B8A6', 'Bookstores and libraries', 5),
('Luxury', 'luxury', get_category_id('shopping'), 'gem', '#14B8A6', 'Luxury brands and premium shopping', 6)
ON CONFLICT (slug) DO UPDATE SET
  parent_id = EXCLUDED.parent_id,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description;

-- ============================================
-- HEALTH & WELLNESS SUB-CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, parent_id, icon, color, description, display_order) VALUES
('Hospitals', 'hospitals', get_category_id('health-wellness'), 'hospital', '#22C55E', 'Hospitals and medical centers', 1),
('Clinics', 'clinics', get_category_id('health-wellness'), 'stethoscope', '#22C55E', 'Medical clinics and specialists', 2),
('Gyms', 'gyms', get_category_id('health-wellness'), 'dumbbell', '#22C55E', 'Fitness centers and gyms', 3),
('Yoga', 'yoga', get_category_id('health-wellness'), 'flower-2', '#22C55E', 'Yoga studios and classes', 4),
('Spas', 'spas', get_category_id('health-wellness'), 'sparkles', '#22C55E', 'Spas and massage centers', 5),
('Pharmacies', 'pharmacies', get_category_id('health-wellness'), 'pill', '#22C55E', 'Medical stores and pharmacies', 6),
('Dentists', 'dentists', get_category_id('health-wellness'), 'smile', '#22C55E', 'Dental clinics and dentists', 7)
ON CONFLICT (slug) DO UPDATE SET
  parent_id = EXCLUDED.parent_id,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description;

-- ============================================
-- COWORKING & BUSINESS SUB-CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, parent_id, icon, color, description, display_order) VALUES
('Coworking Spaces', 'coworking-spaces', get_category_id('coworking-business'), 'users', '#3B82F6', 'Shared workspaces and hot desks', 1),
('Meeting Rooms', 'meeting-rooms', get_category_id('coworking-business'), 'presentation', '#3B82F6', 'Meeting rooms for rent', 2),
('Startup Hubs', 'startup-hubs', get_category_id('coworking-business'), 'rocket', '#3B82F6', 'Incubators and startup spaces', 3),
('Business Lounges', 'business-lounges', get_category_id('coworking-business'), 'armchair', '#3B82F6', 'Business lounges and executive spaces', 4)
ON CONFLICT (slug) DO UPDATE SET
  parent_id = EXCLUDED.parent_id,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description;

-- ============================================
-- EDUCATION SUB-CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, parent_id, icon, color, description, display_order) VALUES
('Coding Bootcamps', 'coding-bootcamps', get_category_id('education'), 'code', '#6366F1', 'Programming courses and bootcamps', 1),
('Language Classes', 'language-classes', get_category_id('education'), 'languages', '#6366F1', 'Language learning centers', 2),
('Music Lessons', 'music-lessons', get_category_id('education'), 'music-2', '#6366F1', 'Music schools and lessons', 3),
('Art Studios', 'art-studios', get_category_id('education'), 'palette', '#6366F1', 'Art classes and studios', 4),
('Libraries', 'libraries', get_category_id('education'), 'library', '#6366F1', 'Public and private libraries', 5)
ON CONFLICT (slug) DO UPDATE SET
  parent_id = EXCLUDED.parent_id,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description;

-- ============================================
-- EVENTS SUB-CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, parent_id, icon, color, description, display_order) VALUES
('Concerts', 'concerts', get_category_id('events'), 'ticket', '#F43F5E', 'Music concerts and live performances', 1),
('Festivals', 'festivals', get_category_id('events'), 'party-popper', '#F43F5E', 'Festivals and cultural events', 2),
('Workshops', 'workshops', get_category_id('events'), 'hammer', '#F43F5E', 'Hands-on workshops and classes', 3),
('Meetups', 'meetups', get_category_id('events'), 'users-round', '#F43F5E', 'Community meetups and gatherings', 4),
('Sports Events', 'sports-events', get_category_id('events'), 'trophy', '#F43F5E', 'Sports matches and tournaments', 5),
('Comedy Shows', 'comedy-shows', get_category_id('events'), 'smile', '#F43F5E', 'Stand-up comedy and humor shows', 6)
ON CONFLICT (slug) DO UPDATE SET
  parent_id = EXCLUDED.parent_id,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description;

-- ============================================
-- TRAVEL & GETAWAYS SUB-CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, parent_id, icon, color, description, display_order) VALUES
('Weekend Trips', 'weekend-trips', get_category_id('travel-getaways'), 'map', '#0EA5E9', 'Quick getaways from Bangalore', 1),
('Treks', 'treks', get_category_id('travel-getaways'), 'mountain', '#0EA5E9', 'Hiking and trekking spots', 2),
('Resorts', 'resorts', get_category_id('travel-getaways'), 'palm-tree', '#0EA5E9', 'Resorts and retreats', 3),
('Homestays', 'homestays', get_category_id('travel-getaways'), 'house', '#0EA5E9', 'Homestays and B&Bs', 4),
('Adventure Sports', 'adventure-sports', get_category_id('travel-getaways'), 'bike', '#0EA5E9', 'Adventure activities and sports', 5)
ON CONFLICT (slug) DO UPDATE SET
  parent_id = EXCLUDED.parent_id,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description;

-- ============================================
-- FAMILY & KIDS SUB-CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, parent_id, icon, color, description, display_order) VALUES
('Play Areas', 'play-areas', get_category_id('family-kids'), 'shapes', '#A855F7', 'Indoor and outdoor play zones', 1),
('Amusement Parks', 'amusement-parks', get_category_id('family-kids'), 'ferris-wheel', '#A855F7', 'Theme parks and amusement centers', 2),
('Museums', 'museums', get_category_id('family-kids'), 'landmark', '#A855F7', 'Museums and educational venues', 3),
('Kid Activities', 'kid-activities', get_category_id('family-kids'), 'blocks', '#A855F7', 'Classes and activities for children', 4)
ON CONFLICT (slug) DO UPDATE SET
  parent_id = EXCLUDED.parent_id,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description;

-- ============================================
-- PETS SUB-CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, parent_id, icon, color, description, display_order) VALUES
('Vets', 'vets', get_category_id('pets'), 'stethoscope', '#84CC16', 'Veterinary clinics and hospitals', 1),
('Pet Shops', 'pet-shops', get_category_id('pets'), 'store', '#84CC16', 'Pet stores and supplies', 2),
('Grooming', 'grooming', get_category_id('pets'), 'scissors', '#84CC16', 'Pet grooming services', 3),
('Dog Parks', 'dog-parks', get_category_id('pets'), 'trees', '#84CC16', 'Parks and spaces for dogs', 4),
('Pet Boarding', 'pet-boarding', get_category_id('pets'), 'home', '#84CC16', 'Pet hotels and boarding', 5)
ON CONFLICT (slug) DO UPDATE SET
  parent_id = EXCLUDED.parent_id,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description;

-- ============================================
-- HOME SERVICES SUB-CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, parent_id, icon, color, description, display_order) VALUES
('Plumbers', 'plumbers', get_category_id('home-services'), 'droplet', '#64748B', 'Plumbing services', 1),
('Electricians', 'electricians', get_category_id('home-services'), 'zap', '#64748B', 'Electrical services', 2),
('Movers', 'movers', get_category_id('home-services'), 'truck', '#64748B', 'Packers and movers', 3),
('Interior Design', 'interior-design', get_category_id('home-services'), 'paint-bucket', '#64748B', 'Interior designers', 4),
('Laundry', 'laundry', get_category_id('home-services'), 'shirt', '#64748B', 'Laundry and dry cleaning', 5)
ON CONFLICT (slug) DO UPDATE SET
  parent_id = EXCLUDED.parent_id,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description;

-- ============================================
-- TRANSPORT SUB-CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, parent_id, icon, color, description, display_order) VALUES
('Metro', 'metro', get_category_id('transport'), 'train', '#78716C', 'Metro stations and routes', 1),
('Parking', 'parking', get_category_id('transport'), 'parking-circle', '#78716C', 'Parking lots and garages', 2),
('Bike Rental', 'bike-rental', get_category_id('transport'), 'bike', '#78716C', 'Bike and scooter rentals', 3),
('Airport Shuttles', 'airport-shuttles', get_category_id('transport'), 'plane', '#78716C', 'Airport transport services', 4)
ON CONFLICT (slug) DO UPDATE SET
  parent_id = EXCLUDED.parent_id,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description;

-- ============================================
-- REAL ESTATE SUB-CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, parent_id, icon, color, description, display_order) VALUES
('PGs', 'pgs', get_category_id('real-estate'), 'bed', '#B45309', 'Paying guest accommodations', 1),
('Co-living', 'co-living', get_category_id('real-estate'), 'users', '#B45309', 'Co-living spaces', 2),
('Relocation Services', 'relocation-services', get_category_id('real-estate'), 'move', '#B45309', 'Moving and relocation help', 3)
ON CONFLICT (slug) DO UPDATE SET
  parent_id = EXCLUDED.parent_id,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description;

-- Clean up helper function
DROP FUNCTION IF EXISTS get_category_id(TEXT);

-- Summary
SELECT 
  (SELECT COUNT(*) FROM categories WHERE parent_id IS NULL) as top_level_categories,
  (SELECT COUNT(*) FROM categories WHERE parent_id IS NOT NULL) as sub_categories,
  (SELECT COUNT(*) FROM categories) as total_categories;
