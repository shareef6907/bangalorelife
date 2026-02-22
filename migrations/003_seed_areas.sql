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
