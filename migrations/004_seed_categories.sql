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
