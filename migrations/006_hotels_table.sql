-- Hotels table for BangaloreLife.com
-- Prepared for Booking.com affiliate integration

CREATE TABLE IF NOT EXISTS hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic info
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  description_raw TEXT,
  
  -- Location
  address TEXT,
  area_id UUID REFERENCES areas(id),
  neighborhood TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  
  -- Ratings & reviews
  star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
  review_score DECIMAL(3,1) CHECK (review_score >= 0 AND review_score <= 10),
  review_count INTEGER DEFAULT 0,
  google_rating DECIMAL(2,1),
  google_review_count INTEGER,
  
  -- Pricing (INR)
  price_min_per_night INTEGER,
  price_max_per_night INTEGER,
  
  -- Amenities & features
  amenities TEXT[] DEFAULT '{}',
  -- Common amenities: wifi, pool, gym, spa, parking, restaurant, bar, 
  -- room-service, airport-shuttle, pet-friendly, business-center, laundry
  
  -- Photos
  photos TEXT[] DEFAULT '{}',
  featured_photo TEXT,
  
  -- Booking info
  booking_url TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  check_in_time TEXT,
  check_out_time TEXT,
  
  -- Hotel type
  hotel_type TEXT DEFAULT 'hotel',
  -- Types: hotel, resort, boutique, hostel, guesthouse, apartment, villa, homestay
  
  -- Data source tracking
  source TEXT,
  source_id TEXT,
  booking_com_id TEXT,
  osm_id TEXT,
  google_place_id TEXT,
  
  -- Flags
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_hotels_neighborhood ON hotels(neighborhood);
CREATE INDEX IF NOT EXISTS idx_hotels_star_rating ON hotels(star_rating);
CREATE INDEX IF NOT EXISTS idx_hotels_price_min ON hotels(price_min_per_night);
CREATE INDEX IF NOT EXISTS idx_hotels_hotel_type ON hotels(hotel_type);
CREATE INDEX IF NOT EXISTS idx_hotels_is_active ON hotels(is_active);
CREATE INDEX IF NOT EXISTS idx_hotels_location ON hotels USING gist (
  ll_to_earth(latitude, longitude)
) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_hotels_slug ON hotels(slug);

-- Full text search
CREATE INDEX IF NOT EXISTS idx_hotels_name_search ON hotels USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_hotels_amenities ON hotels USING gin(amenities);

-- Update trigger
CREATE OR REPLACE FUNCTION update_hotels_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS hotels_updated_at ON hotels;
CREATE TRIGGER hotels_updated_at
  BEFORE UPDATE ON hotels
  FOR EACH ROW
  EXECUTE FUNCTION update_hotels_updated_at();

-- Grant permissions
GRANT SELECT ON hotels TO anon;
GRANT ALL ON hotels TO authenticated;
GRANT ALL ON hotels TO service_role;
