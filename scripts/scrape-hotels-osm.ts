/**
 * OSM Hotel Scraper for BangaloreLife.com
 * Scrapes basic hotel data from OpenStreetMap to bootstrap the hotels table.
 * Will be enriched later with Booking.com affiliate data.
 * 
 * Run: npx tsx scripts/scrape-hotels-osm.ts
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Overpass API endpoint
const OVERPASS_API = 'https://overpass-api.de/api/interpreter';

// Bangalore bounding box (approximate)
const BANGALORE_BBOX = {
  south: 12.85,
  west: 77.45,
  north: 13.15,
  east: 77.78,
};

interface OSMHotel {
  id: number;
  lat: number;
  lon: number;
  tags: {
    name?: string;
    'name:en'?: string;
    tourism?: string;
    stars?: string;
    rooms?: string;
    phone?: string;
    email?: string;
    website?: string;
    'addr:full'?: string;
    'addr:street'?: string;
    'addr:city'?: string;
    'addr:postcode'?: string;
    operator?: string;
    brand?: string;
    internet_access?: string;
    swimming_pool?: string;
    parking?: string;
    restaurant?: string;
    bar?: string;
    gym?: string;
    spa?: string;
    wheelchair?: string;
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractAmenities(tags: OSMHotel['tags']): string[] {
  const amenities: string[] = [];
  
  if (tags.internet_access === 'yes' || tags.internet_access === 'wlan') {
    amenities.push('wifi');
  }
  if (tags.swimming_pool === 'yes') {
    amenities.push('pool');
  }
  if (tags.parking === 'yes' || tags.parking === 'surface') {
    amenities.push('parking');
  }
  if (tags.restaurant === 'yes') {
    amenities.push('restaurant');
  }
  if (tags.bar === 'yes') {
    amenities.push('bar');
  }
  if (tags.gym === 'yes') {
    amenities.push('gym');
  }
  if (tags.spa === 'yes') {
    amenities.push('spa');
  }
  if (tags.wheelchair === 'yes') {
    amenities.push('wheelchair-accessible');
  }
  
  return amenities;
}

function mapHotelType(tourism: string | undefined): string {
  switch (tourism) {
    case 'hotel':
      return 'hotel';
    case 'motel':
      return 'hotel';
    case 'hostel':
      return 'hostel';
    case 'guest_house':
      return 'guesthouse';
    case 'apartment':
      return 'apartment';
    case 'resort':
      return 'resort';
    case 'chalet':
      return 'villa';
    default:
      return 'hotel';
  }
}

async function fetchHotelsFromOSM(): Promise<OSMHotel[]> {
  console.log('🏨 Fetching hotels from OpenStreetMap...');
  
  const query = `
    [out:json][timeout:120];
    (
      // Hotels
      node["tourism"="hotel"](${BANGALORE_BBOX.south},${BANGALORE_BBOX.west},${BANGALORE_BBOX.north},${BANGALORE_BBOX.east});
      way["tourism"="hotel"](${BANGALORE_BBOX.south},${BANGALORE_BBOX.west},${BANGALORE_BBOX.north},${BANGALORE_BBOX.east});
      
      // Hostels
      node["tourism"="hostel"](${BANGALORE_BBOX.south},${BANGALORE_BBOX.west},${BANGALORE_BBOX.north},${BANGALORE_BBOX.east});
      way["tourism"="hostel"](${BANGALORE_BBOX.south},${BANGALORE_BBOX.west},${BANGALORE_BBOX.north},${BANGALORE_BBOX.east});
      
      // Guest houses
      node["tourism"="guest_house"](${BANGALORE_BBOX.south},${BANGALORE_BBOX.west},${BANGALORE_BBOX.north},${BANGALORE_BBOX.east});
      way["tourism"="guest_house"](${BANGALORE_BBOX.south},${BANGALORE_BBOX.west},${BANGALORE_BBOX.north},${BANGALORE_BBOX.east});
      
      // Resorts
      node["tourism"="resort"](${BANGALORE_BBOX.south},${BANGALORE_BBOX.west},${BANGALORE_BBOX.north},${BANGALORE_BBOX.east});
      way["tourism"="resort"](${BANGALORE_BBOX.south},${BANGALORE_BBOX.west},${BANGALORE_BBOX.north},${BANGALORE_BBOX.east});
      
      // Apartments
      node["tourism"="apartment"](${BANGALORE_BBOX.south},${BANGALORE_BBOX.west},${BANGALORE_BBOX.north},${BANGALORE_BBOX.east});
      way["tourism"="apartment"](${BANGALORE_BBOX.south},${BANGALORE_BBOX.west},${BANGALORE_BBOX.north},${BANGALORE_BBOX.east});
    );
    out center;
  `;

  const response = await fetch(OVERPASS_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `data=${encodeURIComponent(query)}`,
  });

  if (!response.ok) {
    throw new Error(`OSM API error: ${response.status}`);
  }

  const data = await response.json();
  console.log(`📊 Found ${data.elements.length} hotels/stays in OSM`);
  
  return data.elements;
}

async function processAndInsertHotels(osmHotels: OSMHotel[]): Promise<void> {
  console.log('\n🔄 Processing hotels...');
  
  const hotels = osmHotels
    .filter(h => h.tags?.name || h.tags?.['name:en'])
    .map(h => {
      const name = h.tags['name:en'] || h.tags.name || 'Unnamed Hotel';
      const starRating = h.tags.stars ? parseInt(h.tags.stars) : null;
      
      // Get coordinates (for ways, use center)
      const lat = h.lat || (h as any).center?.lat;
      const lon = h.lon || (h as any).center?.lon;
      
      return {
        name: name,
        slug: `${slugify(name)}-${h.id}`,
        address: h.tags['addr:full'] || h.tags['addr:street'] || null,
        latitude: lat,
        longitude: lon,
        star_rating: starRating && starRating >= 1 && starRating <= 5 ? starRating : null,
        amenities: extractAmenities(h.tags),
        hotel_type: mapHotelType(h.tags.tourism),
        phone: h.tags.phone || null,
        email: h.tags.email || null,
        website: h.tags.website || null,
        source: 'osm',
        source_id: `osm-${h.id}`,
        osm_id: h.id.toString(),
        is_active: true,
      };
    });

  console.log(`📝 Inserting ${hotels.length} hotels...`);

  // Insert in batches
  const batchSize = 50;
  let inserted = 0;
  let updated = 0;
  let errors = 0;

  for (let i = 0; i < hotels.length; i += batchSize) {
    const batch = hotels.slice(i, i + batchSize);
    
    const { data, error } = await supabase
      .from('hotels')
      .upsert(batch, { 
        onConflict: 'slug',
        ignoreDuplicates: false 
      })
      .select();

    if (error) {
      console.error(`❌ Batch ${i / batchSize + 1} error:`, error.message);
      errors += batch.length;
    } else {
      inserted += data?.length || 0;
      console.log(`✅ Batch ${i / batchSize + 1}: ${data?.length || 0} hotels`);
    }
    
    // Rate limit
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Inserted/Updated: ${inserted}`);
  console.log(`   ❌ Errors: ${errors}`);
}

async function main() {
  console.log('🏨 BangaloreLife Hotel Scraper (OSM)');
  console.log('====================================\n');

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ Missing Supabase credentials');
    process.exit(1);
  }

  try {
    const osmHotels = await fetchHotelsFromOSM();
    await processAndInsertHotels(osmHotels);
    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
